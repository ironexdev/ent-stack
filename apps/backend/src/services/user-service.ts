import { db, takeOne } from "@backend/database"
import { users } from "@backend/database/schema"
import { eq } from "drizzle-orm"
import type { SelectUserType } from "@backend/database/schema/users"

export default class UserService {
  static async selectUserByEmail(
    email: string,
  ): Promise<SelectUserType | null> {
    return await db
      .select()
      .from(users)
      .where(eq(users.email, email))
      .then(takeOne)
  }
}
