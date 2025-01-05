import { index, mysqlTable, timestamp, varchar } from "drizzle-orm/mysql-core"
import { users } from "@backend/database/schema/users"
import { type InferInsertModel, relations } from "drizzle-orm"
import type { InferSelectModel } from "drizzle-orm/table"

export const refreshTokens = mysqlTable(
  "refresh_tokens",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    code: varchar("code", { length: 255 }).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    userId: varchar("user_id", { length: 255 })
      .notNull()
      .references(() => users.id, { onDelete: "cascade" }),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (rt) => ({
    userIdIdx: index("rt_user_id_id-x").on(rt.userId),
  }),
)

export const refreshTokensRelations = relations(refreshTokens, ({ one }) => ({
  user: one(users, { fields: [refreshTokens.userId], references: [users.id] }),
}))

export type SelectRefreshTokenType = InferSelectModel<typeof refreshTokens>
export type InsertRefreshTokenType = InferInsertModel<typeof refreshTokens>
