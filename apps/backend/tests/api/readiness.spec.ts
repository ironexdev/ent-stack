import request from "supertest"
import { test, expect } from "@playwright/test"
import { HttpStatusEnum } from "@shared/enums/http-status-enum"

test.describe("Readiness", () => {
  test("returns success", async ({ baseURL }) => {
    const response = await request(baseURL!).get("/readiness")
    expect(response.status).toBe(HttpStatusEnum.OK)
  })
})
