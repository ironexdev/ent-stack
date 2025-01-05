import AbstractError from "@backend/errors/abstract-error"

export default class ValueNotFoundError extends AbstractError {
  constructor(message?: string) {
    super(message ?? "Value not found.", "ValueNotFoundError")
  }
}
