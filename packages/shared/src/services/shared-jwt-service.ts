import { jwtVerify, SignJWT } from "jose"

type DecodedJWTType = {
  iat: Date
  exp: Date
}

export default class SharedJwtService {
  public static async createJWT(
    content: object,
    expirationInMinutes: number,
    secret: string,
  ): Promise<string> {
    const nowInSeconds = Math.floor(Date.now() / 1000)
    const secretKey = new TextEncoder().encode(secret) // Convert secret to Uint8Array

    return await new SignJWT({
      ...content,
      iat: nowInSeconds - 60, // Issued at now - 60 seconds, to avoid clock skew
      exp: nowInSeconds + 60 * expirationInMinutes, // Expires in specified minutes
    })
      .setProtectedHeader({ alg: "HS256" })
      .sign(secretKey)
  }

  // Returns null if the token is invalid
  public static async verifyAndDecodeJWT<T>(
    token: string,
    secret: string,
  ): Promise<(DecodedJWTType & T) | null> {
    try {
      const secretKey = new TextEncoder().encode(secret) // Convert secret to Uint8Array
      const { payload } = await jwtVerify(token, secretKey, {
        algorithms: ["HS256"],
      })

      const { iat, exp, ...remaining } = payload

      if (typeof iat === "undefined" || typeof exp === "undefined") {
        throw new Error("Invalid token: Missing iat or exp")
      }

      return {
        iat: new Date(iat * 1000), // Convert iat from seconds to Date
        exp: new Date(exp * 1000), // Convert exp from seconds to Date
        ...(remaining as T),
      }
    } catch (error) {
      return null
    }
  }
}
