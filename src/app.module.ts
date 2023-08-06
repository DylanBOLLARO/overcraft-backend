import { Module } from '@nestjs/common';
import { AuthModule } from './auth/auth.module';
import { PrismaModule } from './prisma/prisma.module';
import { ConfigModule } from '@nestjs/config';
import { BuildOrderController } from './build-order/build-order.controller';
import { BuildOrderService } from './build-order/build-order.service';

@Module({
    imports: [
        ConfigModule.forRoot({ isGlobal: true }),
        AuthModule,
        PrismaModule
    ],
    controllers: [BuildOrderController],
    providers: [BuildOrderService]
})
export class AppModule {}
