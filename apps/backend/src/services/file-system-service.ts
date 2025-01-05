import fs from "node:fs/promises"

export default class FileSystemService {
  // Throws an error if the file does not exist
  static async readFile(path: string): Promise<string> {
    return fs.readFile(path, "utf-8")
  }
}
