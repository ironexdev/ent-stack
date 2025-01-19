import { getAllFiles } from "@shared/scripts/helpers/utils"
import { fileURLToPath } from "url"
import * as path from "path"
import { dirname } from "path"
import * as fs from "fs"
import * as ts from "typescript"
import yaml from "js-yaml"

// This script exports message translation functions as .yml files.
// It strips outer backticks/quotes from the extracted values so that YAML does not contain unnecessary quotes.
type MessageType = {
  args: Record<string, string>
  messages: Record<string, string>
}

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)
const messageDir = path.join(__dirname, "../i18n/messages")
const outputDir = path.join(__dirname, "../i18n/new-messages")

processMessages()

// Parses function arguments from parameters
function parseFunctionArgs(
  parameters: readonly ts.ParameterDeclaration[],
): Record<string, string> {
  const args: Record<string, string> = {}
  parameters.forEach((param) => {
    const paramName = param.name.getText()
    args[paramName] = param.type?.getText() || "unknown"
  })
  return args
}

// Remove outer quotes/backticks if they exist
function removeOuterQuotes(str: string): string {
  if (str.length > 1) {
    const firstChar = str[0]
    const lastChar = str[str.length - 1]
    if (
      (firstChar === '"' || firstChar === "'" || firstChar === "`") &&
      firstChar === lastChar
    ) {
      return str.slice(1, -1)
    }
  }
  return str
}

// Parses messages object from an object literal initializer, removing outer quotes
function parseMessages(
  initializer: ts.ObjectLiteralExpression,
): Record<string, string> {
  const messages: Record<string, string> = {}

  initializer.properties.forEach((prop) => {
    if (ts.isPropertyAssignment(prop)) {
      const key = prop.name.getText()
      let value = prop.initializer.getText()

      // Remove outer quotes/backticks from the value
      value = removeOuterQuotes(value)

      messages[key] = value
    }
  })

  return messages
}

// Processes a TypeScript file to extract message functions
function extractMessages(filePath: string): Record<string, MessageType> {
  const sourceFile = ts.createSourceFile(
    filePath,
    fs.readFileSync(filePath, "utf8"),
    ts.ScriptTarget.Latest,
    true,
  )

  const extractedMessages: Record<string, MessageType> = {}

  sourceFile.forEachChild((node) => {
    if (ts.isFunctionDeclaration(node) && node.name?.text.startsWith("t_")) {
      const functionName = node.name.text
      const args = parseFunctionArgs(node.parameters)
      const messages: Record<string, string> = {}

      node.body?.forEachChild((child) => {
        if (ts.isVariableStatement(child)) {
          child.declarationList.declarations.forEach((declaration) => {
            if (
              ts.isVariableDeclaration(declaration) &&
              declaration.name.getText() === "messages" &&
              declaration.initializer &&
              ts.isObjectLiteralExpression(declaration.initializer)
            ) {
              Object.assign(messages, parseMessages(declaration.initializer))
            }
          })
        }
      })

      extractedMessages[functionName] = { args, messages }
    }
  })

  return extractedMessages
}

// Writes messages to a .yml file preserving directory structure
function writeMessagesToFile(
  messages: Record<string, MessageType>,
  originalFilePath: string,
): void {
  const relativePath = path.relative(messageDir, originalFilePath)

  // Replace .ts with .yml
  const outputFilePath = path.join(
    outputDir,
    relativePath.replace(/\.ts$/, ".yml"),
  )

  const outputDirPath = path.dirname(outputFilePath)
  if (!fs.existsSync(outputDirPath)) {
    fs.mkdirSync(outputDirPath, { recursive: true })
  }

  // Convert messages object to YAML
  // Since outer quotes were removed, yaml.dump should represent them without extra quotes
  const yamlContent = yaml.dump(messages, { lineWidth: -1 })

  fs.writeFileSync(outputFilePath, yamlContent, "utf8")
  console.log(`Messages written to: ${outputFilePath}`)
}

// Main function to process all message files
function processMessages() {
  const messageFiles = getAllFiles(messageDir, [])

  messageFiles.forEach((filePath) => {
    try {
      const messages = extractMessages(filePath)
      if (Object.keys(messages).length > 0) {
        writeMessagesToFile(messages, filePath)
      }
    } catch (error) {
      console.error(`Failed to process file: ${filePath}`, error)
    }
  })
}
