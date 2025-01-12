import request from "supertest"
import { expect, test } from "@playwright/test"
import { env } from "@backend/env"
import { VerificationActionEnum } from "@shared/enums/verification-action-enum"
import { users } from "@backend/database/schema"
import { db, takeOne } from "@backend/database"
import { eq } from "drizzle-orm"
import {
  deleteUserByEmail,
  getLatestVerificationPIN,
} from "./helpers/test-utils"
import { HttpStatusEnum } from "@shared/enums/http-status-enum"
import superjson from "superjson"

test.describe("Verification Tokens Router", () => {
  const apiDomain = env.BACKEND_URL
  const email = env.MAILSLURP_EMAIL

  test("should register a new user successfully", async () => {
    const createResponse = await request(apiDomain)
      .post("/trpc/verificationTokens.create")
      .send(
        superjson.serialize({
          email: email,
          action: VerificationActionEnum.REGISTRATION,
          registrationLink: `${env.FRONTEND_URL}/registration`,
          loginLink: `${env.FRONTEND_URL}/login`,
        }),
      )

    expect(createResponse.status).toBe(HttpStatusEnum.OK)
    expect(createResponse.body.result.data.json.status).toBe(true)
    expect(createResponse.body.result.data.json.message).toBeDefined()

    const pin = await getLatestVerificationPIN(
      email,
      VerificationActionEnum.REGISTRATION,
    )
    expect(pin).not.toBeNull()

    const verifyResponse = await request(apiDomain)
      .post("/trpc/verificationTokens.verify")
      .send(
        superjson.serialize({
          email: email,
          action: VerificationActionEnum.REGISTRATION,
          pin,
        }),
      )

    expect(verifyResponse.status).toBe(HttpStatusEnum.OK)
    expect(verifyResponse.body.result.data.json.status).toBe(true)
    expect(verifyResponse.body.result.data.json.message).toBeDefined()

    const user = await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then(takeOne)

    expect(user).not.toBeNull()
    expect(user?.email).toBe(email)
  })

  test.afterAll(async () => {
    await deleteUserByEmail(email)
  })
})
