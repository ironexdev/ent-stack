import AbstractError from "@backend/errors/abstract-error"

export default class DuplicateValueError extends AbstractError {
  constructor(message?: string) {
    super(message ?? "Found duplicate value.", "DuplicateValueError")
  }
}
