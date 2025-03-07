import { MiddlewareConsumer, Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { LoggerMiddleware } from 'middleware/logger'
import { StepModule } from './step/step.module'
import { UserModule } from './user/user.module'
import { BuildModule } from './build/build.module'
import { PrismaModule } from './prisma/prisma.module'

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        StepModule,
        UserModule,
        BuildModule,
    ],
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer.apply(LoggerMiddleware).forRoutes('/')
    }
}
