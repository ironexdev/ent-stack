import { defineConfig, devices } from "@playwright/test"
import { configDotenv } from "dotenv"

configDotenv()

export default defineConfig({
  testDir: "./tests/e2e",
  fullyParallel: true,
  forbidOnly: true,
  retries: 0,
  workers: "50%",
  reporter: "html",
  use: {
    baseURL: process.env.NEXT_PUBLIC_FRONTEND_URL,
    trace: "on-first-retry",
  },

  projects: [
    // Desktop configurations
    {
      name: "Desktop Chrome",
      use: { ...devices["Desktop Chrome"] },
    },
    {
      name: "Desktop Firefox",
      use: { ...devices["Desktop Firefox"] },
    },
    {
      name: "Desktop Safari",
      use: { ...devices["Desktop Safari"] },
    },

    // Mobile configurations
    {
      name: "Pixel 6",
      use: { ...devices["Pixel 6"] },
    },
    {
      name: "Iphones",
      use: { ...devices["iPhone 13"], ...devices["iPhone SE"] },
    },
  ],
})
