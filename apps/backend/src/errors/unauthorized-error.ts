// Should be called UnauthenticatedError, but following HTTP 401 naming convention for consitency, even though it's not accurate

import AbstractError from "@backend/errors/abstract-error"

export default class UnauthorizedError extends AbstractError {
  constructor(message?: string) {
    super(
      message ?? "User is not authorized (authenticated).",
      "UnauthorizedError",
    )
  }
}
