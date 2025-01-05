import AbstractError from "@backend/errors/abstract-error"

export default class InvalidOrExpiredRefreshToken extends AbstractError {
  constructor(message?: string) {
    super(
      message ?? "Invalid or expired refresh token.",
      "InvalidOrExpiredRefreshToken",
    )
  }
}
