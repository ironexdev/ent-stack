import { test, expect } from "@playwright/test"

test.describe("Menu", async () => {
  test.beforeEach(async ({ page }) => {
    await page.goto("/")
  })

  test("can be toggled", async ({ page }) => {
    const menu = page.getByTestId("menu")
    const open = page.getByTestId("menu-open")
    const close = page.getByTestId("menu-close")

    await expect(menu).not.toBeVisible()
    await open.click()
    await expect(menu).toBeVisible()
    await close.click()
    await expect(menu).not.toBeVisible()
  })
})
