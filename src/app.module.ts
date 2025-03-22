import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from 'middleware/logger'
import { StepModule } from './step/step.module'
import { UserModule } from './user/user.module'
import { BuildModule } from './builds/builds.module'
import { PrismaModule } from './prisma/prisma.module'
import { AuthModule } from './auth/auth.module'
import { FavoritesModule } from './favorites/favorites.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        StepModule,
        UserModule,
        BuildModule,
        AuthModule,
        FavoritesModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/')
    }
}
