import { type SessionType } from "@shared/types/session-type"
import SharedJwtService from "@shared/services/shared-jwt-service"

export default class SharedAuthService {
  protected static async authenticateWithAccessToken(
    accessToken: string,
    secret: string,
  ): Promise<SessionType | null> {
    const decodedAccessTokenPayload =
      await SharedJwtService.verifyAndDecodeJWT<SessionType>(
        accessToken,
        secret,
      )

    if (!decodedAccessTokenPayload) {
      return null
    }

    const { iat, exp, ...session } = decodedAccessTokenPayload

    return session
  }
}
