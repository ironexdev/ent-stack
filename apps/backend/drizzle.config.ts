// Not using env.ts here because of CI/CD
// If used, then full backend app would have to run in order to run migrations
// import { env } from "@backend/env"

export default {
  schema: "./src/database/schema/index.ts",
  dialect: "mysql",
  dbCredentials: {
    host: process.env.MYSQL_HOST,
    port: process.env.MYSQL_PORT,
    user: process.env.MYSQL_USER,
    password: process.env.MYSQL_PASSWORD,
    database: process.env.MYSQL_DATABASE,
  },
}
