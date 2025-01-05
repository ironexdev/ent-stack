import { drizzle } from "drizzle-orm/mysql2"
import { createPool, type Pool } from "mysql2/promise"
import * as schema from "@backend/database/schema"
import { mysqlTableCreator } from "drizzle-orm/mysql-core"
import DuplicateValueError from "@backend/errors/duplicate-value-error"
import { env } from "@backend/env"

/**
 * Cache the database connection in development. This avoids creating a new connection on every HMR
 * update.
 */
const globalForDb = globalThis as unknown as {
  conn: Pool | null
}

const conn =
  globalForDb.conn ??
  createPool({
    host: env.MYSQL_HOST,
    port: Number(env.MYSQL_PORT),
    user: env.MYSQL_USER,
    password: env.MYSQL_PASSWORD,
    database: env.MYSQL_DATABASE,
    waitForConnections: true,
    connectionLimit: 50,
    queueLimit: 0,
  })

if (env.NODE_ENV !== "production") globalForDb.conn = conn

export const db = drizzle(conn, { schema, mode: "default" })

/**
 * This is an example of how to use the multi-project schema feature of Drizzle ORM. Use the same
 * database instance for multiple projects.
 *
 * @see https://orm.drizzle.team/docs/goodies#multi-project-schema
 */
export const createTable = mysqlTableCreator((name) => `rp_${name}`)

export function takeOne<T>(values: T[]): T | null {
  if (values.length === 0) {
    return null // Return null if no values are found
  }

  if (values.length !== 1) {
    throw new DuplicateValueError() // Throw error if there are multiple values
  }

  return values[0] ?? null // Return the single value
}
