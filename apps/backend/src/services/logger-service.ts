import { IncomingMessage, ServerResponse } from "http"
import { EnvironmentEnum } from "@shared/enums/environment-enum"
import { env } from "@backend/env"

export default class LoggerService {
  static serializeRequest(
    req: IncomingMessage,
  ): IncomingMessage | { method: string; url: string | null } {
    return env.NODE_ENV === EnvironmentEnum.DEVELOPMENT
      ? this.serializeRequestDev(req)
      : req
  }

  static serializeResponse(
    res: ServerResponse,
  ): ServerResponse | { statusCode: number; statusMessage: string | null } {
    return env.NODE_ENV === EnvironmentEnum.DEVELOPMENT
      ? this.serializeResponseDev(res)
      : res
  }

  private static serializeRequestDev(req: IncomingMessage): {
    id: string
    method: string
    url: string
  } {
    return {
      id: req.id.toString(),
      method: req.method ?? "N/A",
      url: req.url ?? "N/A",
    }
  }

  private static serializeResponseDev(res: ServerResponse): {
    statusCode: number
    statusMessage: string
  } {
    return {
      statusCode: res.statusCode,
      statusMessage: res.statusMessage,
    }
  }
}
