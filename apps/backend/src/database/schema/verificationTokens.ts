import {
  mysqlTable,
  timestamp,
  varchar,
  mysqlEnum,
  index,
} from "drizzle-orm/mysql-core"
import { type InferInsertModel } from "drizzle-orm"
import { verificationActionEnumAsArray } from "@shared/enums/verification-action-enum"
import type { InferSelectModel } from "drizzle-orm/table"

export const verificationTokens = mysqlTable(
  "verification_tokens",
  {
    id: varchar("id", { length: 255 })
      .notNull()
      .primaryKey()
      .$defaultFn(() => crypto.randomUUID()),
    pin: varchar("pin", { length: 6 }).notNull(),
    action: mysqlEnum(
      "action",
      verificationActionEnumAsArray as [string],
    ).notNull(),
    expires: timestamp("expires", { mode: "date" }).notNull(),
    email: varchar("email", { length: 320 }).notNull(),
    createdAt: timestamp("created_at").notNull().defaultNow(),
    updatedAt: timestamp("updated_at").onUpdateNow(),
  },
  (vt) => ({
    emailActionIdx: index("vt_email_action_idx").on(vt.email, vt.action),
    emailIdx: index("vt_email_idx").on(vt.email),
  }),
)

export type SelectVerificationTokenType = InferSelectModel<
  typeof verificationTokens
>
export type InsertVerificationTokenType = InferInsertModel<
  typeof verificationTokens
>
