import { createParamDecorator, ExecutionContext } from '@nestjs/common'

export const GetCurrentUserId = createParamDecorator(
    (_: any, context: ExecutionContext) => {
        const request = context.switchToHttp().getRequest()
        return request?.user?.userinfo?.sub ?? null
    }
)
