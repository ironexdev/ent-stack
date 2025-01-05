import { fileURLToPath } from "url"
import { dirname } from "path"

const __filename = fileURLToPath(import.meta.url)
const __dirname = dirname(__filename)

export default class BackendConfig {
  static readonly verificationTokenMaxActiveCount = 3 // Maximum number of active verification tokens per action
  static readonly verificationTokenExpirationInMinutes = 10
  static readonly emailTemplatesDirectory = `${__dirname}/../static/email-templates`
}
