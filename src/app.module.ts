import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { BuildModule } from "./build/build.module";
import { StepModule } from "./step/step.module";
import { UserModule } from "./user/user.module";
import { RequestLoggerMiddleware } from "middleware/logger";
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from "@nestjs/core";
import { AtGuard } from "./common/guards";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		BuildModule,
		StepModule,
		UserModule,
		AuthModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AtGuard,
		},
	],

})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes("*");
	}
}
