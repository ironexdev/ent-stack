import { removeWhitespaceFromLineStart } from "@backend/lib/utils"

export default abstract class AbstractError extends Error {
  protected constructor(
    message: string,
    public name: string,
    public previous?: Error,
  ) {
    super(message)
    const currentStack = this.stack
      ? removeWhitespaceFromLineStart(this.stack).split("\n")
      : ["Empty stack trace."]

    const previousStack =
      previous && previous.stack
        ? removeWhitespaceFromLineStart(previous.stack).split("\n")
        : ["Empty stack trace."]

    this.stack = JSON.stringify(
      {
        current: currentStack,
        previous: previousStack,
      },
      null,
      2,
    )
  }
}
