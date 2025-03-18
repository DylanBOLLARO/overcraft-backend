import { CanActivate, ExecutionContext, Injectable } from '@nestjs/common'

@Injectable()
export class AuthenticatedGuard implements CanActivate {
    private readonly API_KEY = process.env.API_KEY || 'secret-api-key'

    async canActivate(context: ExecutionContext) {
        const request = context.switchToHttp().getRequest()
        const apiKey = request.headers['x-api-key']
        if (apiKey === this.API_KEY) return true
        return request.isAuthenticated()
    }
}
