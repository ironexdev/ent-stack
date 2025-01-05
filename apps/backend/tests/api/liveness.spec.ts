import request from "supertest"
import { test, expect } from "@playwright/test"
import { HttpStatusEnum } from "@shared/enums/http-status-enum"

test.describe("Liveness", () => {
  test("returns success", async ({ baseURL }) => {
    const response = await request(baseURL!).get("/liveness")
    expect(response.status).toBe(HttpStatusEnum.OK)
  })
})
