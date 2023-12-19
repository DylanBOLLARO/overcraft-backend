import { MiddlewareConsumer, Module } from '@nestjs/common';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BuildOrderController } from './build-order/build-order.controller';
import { BuildOrderService } from './build-order/build-order.service';
import { BuildModule } from './build/build.module';
import { StepModule } from './step/step.module';
import { UserModule } from './user/user.module';
import { RequestLoggerMiddleware } from 'request-logger.middleware';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        PrismaModule,
        BuildModule,
        StepModule,
        UserModule,
    ],
    controllers: [BuildOrderController],
    providers: [BuildOrderService]
})
export class AppModule {
    configure(consumer: MiddlewareConsumer) {
        consumer
            .apply(RequestLoggerMiddleware)
            .forRoutes('*');
    }
}