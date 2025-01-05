export class SharedErrorService {
  public static catchAsyncError<
    T,
    E extends new (message?: string | null) => Error,
  >(
    promise: Promise<T>,
    errorsToCatch?: E[],
  ): Promise<[null, T] | [InstanceType<E>, null]> {
    return promise
      .then((data) => {
        return [null, data] as [null, T] // Success case: [null, T]
      })
      .catch((error: unknown) => {
        if (errorsToCatch == null) {
          return [error as InstanceType<E>, null] // Error case without specific errors to catch
        }

        if (errorsToCatch.some((e) => error instanceof e)) {
          return [error as InstanceType<E>, null] // Error case with specific errors to catch
        }

        throw error // Rethrow if the error is not to be caught
      })
  }
}
