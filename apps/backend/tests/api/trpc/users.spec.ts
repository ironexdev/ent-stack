import request from "supertest"
import { expect, test } from "@playwright/test"
import { env } from "@backend/env"
import { deleteUserByEmail, registerAndVerifyUser } from "./helpers/test-utils"
import { HttpStatusEnum } from "@shared/enums/http-status-enum"

test.describe("Users Router", () => {
  const apiDomain = env.BACKEND_URL
  const email = env.MAILSLURP_EMAIL
  let registerAndVerifyUserResponse: Awaited<
    ReturnType<typeof registerAndVerifyUser>
  >

  test.beforeAll(async () => {
    registerAndVerifyUserResponse = await registerAndVerifyUser(email)
  })

  test("should get current user information", async () => {
    const response = await request(apiDomain)
      .get("/trpc/users.getCurrent")
      .set("Cookie", registerAndVerifyUserResponse.cookies ?? "")
      .send()

    expect(response.status).toBe(HttpStatusEnum.OK)
    expect(response.body.result.data.json.user).toBeDefined()
    expect(response.body.result.data.json.user.email).toBe(email)
  })

  test.afterAll(async () => {
    await deleteUserByEmail(email)
  })
})
