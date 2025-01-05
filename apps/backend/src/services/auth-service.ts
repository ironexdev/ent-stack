import SharedJwtService from "@shared/services/shared-jwt-service"
import { refreshTokens, users } from "@backend/database/schema"
import { eq } from "drizzle-orm"
import { db, takeOne } from "@backend/database"
import type { SelectRefreshTokenType } from "@backend/database/schema/refreshTokens"
import type { SelectUserType } from "@backend/database/schema/users"
import SharedConfig from "@shared/config/shared-config"
import SharedAuthService from "@shared/services/shared-auth-service"
import type { SessionType } from "@shared/types/session-type"
import { logger } from "@backend/index"
import { env } from "@backend/env"

export default class AuthService extends SharedAuthService {
  static async authenticateWithAccessToken(
    accessToken: string,
  ): Promise<SessionType | null> {
    return await SharedAuthService.authenticateWithAccessToken(
      accessToken,
      env.JWT_SECRET,
    )
  }

  // Returns the new access token
  static async authenticateWithRefreshToken(
    refreshToken: string,
    database: typeof db,
  ): Promise<string | null> {
    const refreshTokenEntity = (await database
      .select()
      .from(refreshTokens)
      .where(eq(refreshTokens.code, refreshToken))
      .then(takeOne)) as SelectRefreshTokenType

    if (!refreshTokenEntity) {
      logger.warn({
        msg: "Failed authentication refresh - the refresh token was not found in the database.",
      })
      return null
    }

    if (refreshTokenEntity.expires <= new Date()) {
      // Consider removing this in the future, might be unnecessary, refresh token can expire by design
      logger.warn({
        msg: "Failed authentication refresh - the refresh token is expired.",
      })
      return null
    }

    const user = (await database
      .select()
      .from(users)
      .where(eq(users.id, refreshTokenEntity.userId))
      .then(takeOne)) as SelectUserType

    if (!user) {
      logger.warn({
        msg: "Failed authentication refresh - user in the refresh token entity was not found in the database.",
      })
      return null
    }

    const active = !!user.emailVerified // User is created after the e-mail is verified

    return await SharedJwtService.createJWT(
      {
        id: user.id,
        email: user.email,
        active,
      },
      SharedConfig.accessTokenExpirationInMinutes,
      env.JWT_SECRET,
    )
  }

  static async authenticate(
    accessToken: string | null,
    refreshToken: string | null,
    database: typeof db,
  ): Promise<SessionType | null> {
    // Authenticate user with access token
    let session = accessToken
      ? await this.authenticateWithAccessToken(accessToken)
      : null

    // Try to authenticate user with refresh token if access token is not valid
    if (!session) {
      if (refreshToken) {
        const newAccessToken = await this.authenticateWithRefreshToken(
          refreshToken,
          database,
        )

        if (newAccessToken) {
          session = await this.authenticateWithAccessToken(newAccessToken)
        }
      }
    }

    return session
  }
}
