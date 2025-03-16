// src/auth/auth.module.ts
import { Module } from '@nestjs/common'
import { PassportModule } from '@nestjs/passport'
import { OidcStrategy, buildOpenIdClient } from './oidc.strategy'
import { SessionSerializer } from './session.serializer'
import { AuthService } from './auth.service'
import { AuthController } from './auth.controller'
import { PrismaService } from 'src/prisma/prisma.service'
import { PrismaModule } from 'src/prisma/prisma.module'
import { UserModule } from 'src/user/user.module'
import { UserService } from 'src/user/user.service'

const OidcStrategyFactory = {
    provide: 'OidcStrategy',
    useFactory: async (authService: AuthService) => {
        const client = await buildOpenIdClient()
        const strategy = new OidcStrategy(authService, client)
        return strategy
    },
    inject: [AuthService],
}

@Module({
    imports: [
        PrismaModule,
        PassportModule.register({ session: true, defaultStrategy: 'oidc' }),
        UserModule,
    ],
    controllers: [AuthController],
    providers: [
        OidcStrategyFactory,
        SessionSerializer,
        AuthService,
        PrismaService,
        UserService,
    ],
})
export class AuthModule {}
