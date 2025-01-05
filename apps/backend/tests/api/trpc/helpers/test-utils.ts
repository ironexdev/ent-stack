import request from "supertest"
import { db } from "@backend/database"
import { users, verificationTokens } from "@backend/database/schema"
import { eq, and, desc } from "drizzle-orm"
import { VerificationActionEnum } from "@shared/enums/verification-action-enum"
import { env } from "@backend/env"
import superjson from "superjson"

export async function getLatestVerificationPIN(
  email: string,
  action: VerificationActionEnum,
): Promise<string | null> {
  const token = await db
    .select()
    .from(verificationTokens)
    .where(
      and(
        eq(verificationTokens.email, email),
        eq(verificationTokens.action, action),
      ),
    )
    .orderBy(desc(verificationTokens.createdAt))
    .limit(1)
    .then((rows) => rows[0] || null)

  return token?.pin || null
}

export async function deleteUserByEmail(email: string): Promise<void> {
  await db.delete(users).where(eq(users.email, email))
}

export async function registerAndVerifyUser(
  email: string,
): Promise<{ cookies?: string; accessToken: string; refreshToken: string }> {
  await request(env.BACKEND_URL)
    .post("/trpc/verificationTokens.create")
    .send(
      superjson.serialize({
        email: email,
        action: VerificationActionEnum.REGISTRATION,
        registrationLink: `${env.FRONTEND_URL}/en/registration`,
        loginLink: `${env.FRONTEND_URL}/en/login`,
      }),
    )

  const pin = await getLatestVerificationPIN(
    email,
    VerificationActionEnum.REGISTRATION,
  )

  if (!pin) {
    throw new Error("Verification PIN not found for registration.")
  }

  const verifyResponse = await request(env.BACKEND_URL)
    .post("/trpc/verificationTokens.verify")
    .send(
      superjson.serialize({
        email,
        action: VerificationActionEnum.REGISTRATION,
        pin,
      }),
    )

  if (verifyResponse.status !== 200) {
    throw new Error("Verification failed.")
  }

  const cookies = verifyResponse.headers["set-cookie"]

  return {
    cookies,
    accessToken: verifyResponse.body.result.data.json.accessToken,
    refreshToken: verifyResponse.body.result.data.json.refreshToken,
  }
}
