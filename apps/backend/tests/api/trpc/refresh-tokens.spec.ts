import request from "supertest"
import { expect, test } from "@playwright/test"
import { deleteUserByEmail, registerAndVerifyUser } from "./helpers/test-utils"
import { env } from "@backend/env"
import { HttpStatusEnum } from "@shared/enums/http-status-enum"
import superjson from "superjson"
import { CookieEnum } from "@shared/enums/cookie-enum"
import setCookieParser from "set-cookie-parser"

test.describe("Refresh Tokens Router", () => {
  const apiDomain = env.BACKEND_URL
  const email = env.MAILSLURP_EMAIL
  let registerAndVerifyUserResponse: Awaited<
    ReturnType<typeof registerAndVerifyUser>
  >

  test.beforeAll(async () => {
    registerAndVerifyUserResponse = await registerAndVerifyUser(email)
  })

  test("should verify refresh token", async () => {
    const response = await request(apiDomain)
      .post("/trpc/refreshTokens.verify")
      .send(
        superjson.serialize({
          refreshToken: registerAndVerifyUserResponse.refreshToken,
        }),
      )
    expect(response.status).toBe(HttpStatusEnum.OK)
    expect(response.body.result.data.json.status).toBe(true)
    expect(response.body.result.data.json.accessToken).toBeDefined()
  })

  test("should delete refresh token", async () => {
    const response = await request(apiDomain)
      .post("/trpc/refreshTokens.delete")
      .set("Cookie", registerAndVerifyUserResponse.cookies ?? "")
      .send(superjson.serialize({}))

    expect(response.status).toBe(HttpStatusEnum.OK)
    expect(response.body.result.data.json.status).toBe(true)

    const setCookieHeader = response.headers["set-cookie"]
    expect(setCookieHeader).toBeDefined()

    const parsedCookies = setCookieParser(setCookieHeader!)

    const cookieMap = parsedCookies.reduce(
      (acc: Record<string, string>, cookie: setCookieParser.Cookie) => {
        acc[cookie.name] = cookie.value
        return acc
      },
      {} as Record<string, string>,
    )

    expect(cookieMap[CookieEnum.ACCESS_TOKEN]).toBe("")
    expect(cookieMap[CookieEnum.REFRESH_TOKEN]).toBe("")
  })

  test.afterAll(async () => {
    await deleteUserByEmail(email)
  })
})
