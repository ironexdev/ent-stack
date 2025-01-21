import { resolvePath } from "@backend/lib/utils"

export default class BackendConfig {
  static readonly verificationTokenMaxActiveCount = 3 // Maximum number of active verification tokens per action
  static readonly verificationTokenExpirationInMinutes = 10
  static readonly emailTemplatesDirectory = resolvePath(
    "static/email-templates",
  )
}
