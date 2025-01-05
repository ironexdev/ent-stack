import { defineConfig } from "@playwright/test"

// dotenv.config()

export default defineConfig({
  testDir: "./tests/api",
  fullyParallel: false,
  forbidOnly: true,
  retries: 0,
  workers: 1,
  reporter: "html",
  use: {
    baseURL: process.env.BACKEND_URL,
    trace: "on-first-retry",
  },

  projects: [
    {
      name: "API Tests",
    },
  ],
})
