import * as fs from "fs"
import * as path from "path"
import { getAllFiles } from "@shared/scripts/helpers/utils"
import { fileURLToPath } from "url"
import yaml from "js-yaml"

// This script imports translations from YML files into TS files using a simpler, more regex/string-based approach.
// After import:
// - All message values are backtick-quoted.
// - Only changed values are updated, keys, colons, and commas remain intact.
// - Backticks inside the new value are escaped.
// If keys or structure don't match, errors are logged.

// Types
type JsonFunctionContent = {
  args: Record<string, string>
  messages: Record<string, string>
}

type MessagesJsonFile = {
  [funcName: string]: JsonFunctionContent
}

// Paths
const __filename = fileURLToPath(import.meta.url)
const __dirname = path.dirname(__filename)
const messageDir = path.join(__dirname, "../i18n/messages")
const outputDir = path.join(__dirname, "../i18n/new-messages")
const changedFunctions: string[] = []
const issues: string[] = []

// Process all YML files
const ymlFiles = getAllFiles(outputDir, []).filter((f) => f.endsWith(".yml"))

for (const ymlFilePath of ymlFiles) {
  const ymlContent = readYmlFile(ymlFilePath, issues)
  if (!ymlContent) continue

  const relativePath = path.relative(outputDir, ymlFilePath)
  const correspondingTSPath = path.join(
    messageDir,
    relativePath.replace(/\.yml$/, ".ts"),
  )

  if (!fs.existsSync(correspondingTSPath)) {
    issues.push(`YML file without corresponding TS file: ${ymlFilePath}`)
    continue
  }

  validateExtraYmlEntries(ymlFilePath, ymlContent, correspondingTSPath, issues)

  const tsContent = fs.readFileSync(correspondingTSPath, "utf8")
  const updatedContent = updateTsSourceFile(
    correspondingTSPath,
    tsContent,
    ymlContent,
    changedFunctions,
    issues,
  )

  if (updatedContent !== null) {
    fs.writeFileSync(correspondingTSPath, updatedContent, { encoding: "utf8" })
  }
}

logResults(changedFunctions, issues)

// Checks if data matches MessagesJsonFile structure
function isMessagesJsonFile(data: unknown): data is MessagesJsonFile {
  if (typeof data !== "object" || data === null) return false

  for (const value of Object.values(data)) {
    if (typeof value !== "object" || value === null) return false

    const val = value as JsonFunctionContent

    if (typeof val.messages !== "object" || val.messages === null) return false

    for (const msgValue of Object.values(val.messages)) {
      if (typeof msgValue !== "string") return false
    }
  }
  return true
}

// Logs changed functions and issues
function logResults(changedFunctions: string[], issues: string[]): void {
  console.log("=== Changed Functions ===")
  if (changedFunctions.length === 0) {
    console.log("No functions changed.")
  } else {
    for (const entry of changedFunctions) console.log(entry)
  }

  console.log("\n=== Issues ===")

  if (issues.length === 0) {
    console.log("No issues found.")
  } else {
    for (const issue of issues) console.log(issue)
  }
}

// Reads and parses a YML file
function readYmlFile(
  filePath: string,
  issues: string[],
): MessagesJsonFile | null {
  try {
    const content = fs.readFileSync(filePath, "utf8")
    const parsed = yaml.load(content)
    if (isMessagesJsonFile(parsed)) {
      return parsed
    } else {
      issues.push(`Invalid YML structure in file: ${filePath}`)
      return null
    }
  } catch (error: unknown) {
    issues.push(`Failed to parse YML file: ${filePath} - ${String(error)}`)
    return null
  }
}

// Escape backticks inside new values
function escapeBackticks(val: string): string {
  return val.replace(/`/g, "\\`")
}

function updateTsSourceFile(
  tsFilePath: string,
  tsContent: string,
  ymlContent: MessagesJsonFile,
  changedFunctions: string[],
  issues: string[],
): string | null {
  let updatedContent = tsContent
  let fileChanged = false

  // For each function in YML
  for (const [functionName, data] of Object.entries(ymlContent)) {
    if (!functionName.startsWith("t_")) continue

    // Find the function in TS
    const funcRegex = new RegExp(`function\\s+${functionName}\\s*\\(`)
    const funcMatch = funcRegex.exec(updatedContent)

    if (!funcMatch) {
      // If no TS function found for this YML function, skip or already handled
      continue
    }

    // Find "const messages =" after the function declaration
    const startIndex = updatedContent.indexOf(
      "const messages =",
      funcMatch.index,
    )

    if (startIndex === -1) {
      issues.push(
        `No "messages" object found in function: ${tsFilePath} - ${functionName}`,
      )
      continue
    }

    const braceStart = updatedContent.indexOf("{", startIndex)

    if (braceStart === -1) {
      issues.push(
        `No opening '{' for messages object in ${functionName} in ${tsFilePath}`,
      )
      continue
    }

    // Match braces
    let braceCount = 1
    let pos = braceStart + 1

    while (pos < updatedContent.length && braceCount > 0) {
      if (updatedContent[pos] === "{") braceCount++
      if (updatedContent[pos] === "}") braceCount--
      pos++
    }

    if (braceCount !== 0) {
      issues.push(
        `No matching '}' for messages object in ${functionName} in ${tsFilePath}`,
      )
      continue
    }

    const braceEnd = pos - 1
    const messagesBlock = updatedContent.substring(braceStart, braceEnd + 1)
    const lines = messagesBlock.split("\n")

    // Regex to capture: key: "value",
    // This regex:
    // - key: can be quoted or not
    // - value: is enclosed in `"` or `'` or `` ` ``
    // We rely on groups: m[1] = key (with optional quotes), m[2] = quote char, m[3] = value inside quotes
    const simplerRegex = /^\s*(["']?[\w$]+["']?)\s*:\s*([`"'])(.*?)\2\s*,?\s*$/

    // Map of key->line info
    const lineMap: { [key: string]: { lineIndex: number; original: string } } =
      {}

    // Using for-of to ensure line is always defined
    for (let i = 0; i < lines.length; i++) {
      const line = lines[i]!
      if (line.trim().startsWith("{") || line.trim().startsWith("}")) continue
      const m = simplerRegex.exec(line)
      if (m) {
        const keyNameRaw = m[1]!
        // Non-null assertion because we're in the if(m) block, so m[1] exists
        const keyName = keyNameRaw.replace(/['"]/g, "") // remove quotes from key name
        lineMap[keyName] = { lineIndex: i, original: line }
      }
    }

    const tsKeys = Object.keys(lineMap)
    const jsonKeys = Object.keys(data.messages)

    if (
      tsKeys.length !== jsonKeys.length ||
      !tsKeys.every((k) => jsonKeys.includes(k))
    ) {
      issues.push(
        `Key mismatch in function ${functionName}. TS keys: [${tsKeys.join(", ")}], YML keys: [${jsonKeys.join(", ")}]`,
      )
      continue
    }

    let functionChanged = false

    for (const keyName of tsKeys) {
      const tsLine = lineMap[keyName]!.original // Non-null assertion: we know lineMap[keyName] exists
      const m = simplerRegex.exec(tsLine)

      if (!m) continue

      const originalVal = m[3]! // Non-null: if m exists, group 3 exists
      const newVal = data.messages[keyName]!

      // originalVal is the raw inner content of the quotes
      if (originalVal !== newVal) {
        const sanitizedVal = escapeBackticks(newVal)

        // Replace value with backtick-quoted version
        // Use a direct replacement of the captured groups
        lines[lineMap[keyName]!.lineIndex!] = tsLine.replace(
          simplerRegex,
          (_full, keyCaptured, quoteCaptured, contentCaptured) => {
            // Return same key, but replace value part with `sanitizedVal`
            // We always want backticks now
            return tsLine.replace(
              quoteCaptured + contentCaptured + quoteCaptured,
              "`" + sanitizedVal + "`",
            )
          },
        )

        // Non-null assertion on indexes
        functionChanged = true
      }
    }

    if (functionChanged) {
      fileChanged = true

      const newMessagesBlock = lines.join("\n")

      updatedContent =
        updatedContent.substring(0, braceStart) +
        newMessagesBlock +
        updatedContent.substring(braceEnd + 1)

      changedFunctions.push(`${tsFilePath} - ${functionName}`)
    }
  }

  return fileChanged ? updatedContent : null
}

// Validates that every function-like key (prefixed with "t_") in a given YAML/JSON file
// has a corresponding function definition in the specified TypeScript file. If any function
// is missing, it records a descriptive issue.
function validateExtraYmlEntries(
  ymlFilePath: string,
  ymlContent: MessagesJsonFile,
  tsFilePath: string,
  issues: string[],
): void {
  if (!fs.existsSync(tsFilePath)) return

  const tsContent = fs.readFileSync(tsFilePath, "utf8")

  // Just check if all functions exist
  for (const funcName of Object.keys(ymlContent)) {
    if (!funcName.startsWith("t_")) continue

    const funcRegex = new RegExp(`function\\s+${funcName}\\s*\\(`)

    if (!funcRegex.test(tsContent)) {
      issues.push(
        `YML object without corresponding TS function: ${ymlFilePath} - ${funcName}`,
      )
    }
  }
}
