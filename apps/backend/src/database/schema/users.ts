import { type InferInsertModel, sql } from "drizzle-orm"
import { mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"
import type { InferSelectModel } from "drizzle-orm/table"

export const users = mysqlTable("users", {
  id: varchar("id", { length: 255 })
    .notNull()
    .primaryKey()
    .$defaultFn(() => crypto.randomUUID()),
  email: varchar("email", { length: 255 }).notNull().unique(),
  emailVerified: timestamp("email_verified", {
    mode: "date",
    fsp: 3,
  }).default(sql`CURRENT_TIMESTAMP(3)`),
  createdAt: timestamp("created_at").notNull().defaultNow(),
  updatedAt: timestamp("updated_at").onUpdateNow(),
})

export type SelectUserType = InferSelectModel<typeof users>
export type InsertUserType = InferInsertModel<typeof users>
