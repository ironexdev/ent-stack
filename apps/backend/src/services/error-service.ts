import type { Request, Response, NextFunction, RequestHandler } from "express"
import { SharedErrorService } from "@shared/services/shared-error-service"

export class ErrorService extends SharedErrorService {
  // Generic method to catch async errors and forward them to error-handling middleware
  public static handleAsyncErrors<T>(
    fn: (req: Request, res: Response, next: NextFunction) => Promise<T>,
  ): RequestHandler {
    return (req: Request, res: Response, next: NextFunction) => {
      fn(req, res, next).catch(next)
    }
  }
}
