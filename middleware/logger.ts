import { Injectable, Logger, NestMiddleware } from '@nestjs/common'
import { Request, Response, NextFunction } from 'express'

@Injectable()
export class LoggerMiddleware implements NestMiddleware {
    use(req: Request, res: Response, next: NextFunction) {
        Logger.log(
            `${req.method} ${JSON.stringify(req.originalUrl)} ${JSON.stringify(req.body || {})}`
        )
        next()
    }
}
