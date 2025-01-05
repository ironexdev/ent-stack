import { test, expect } from "@playwright/test"

test.describe("Home Page", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("has a visible header with logo and menu button", async ({ page }) => {
    await expect(page.getByTestId("header")).toBeVisible()
    await expect(page.getByTestId("logo")).toBeVisible()
    await expect(page.getByTestId("menu-open")).toBeVisible()
  })

  test("displays main content with the correct title", async ({ page }) => {
    const pageTitle = page.getByTestId("page-title")
    await expect(page.getByTestId("main")).toBeVisible()
    await expect(pageTitle).toHaveText("Home") // Adjust based on locale
  })
})
