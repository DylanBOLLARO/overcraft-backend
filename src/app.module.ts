import { MiddlewareConsumer, Module } from "@nestjs/common";
import { ConfigModule } from "@nestjs/config";
import { APP_GUARD } from "@nestjs/core";
import { AuthModule } from "./auth/auth.module";
import { AtGuard } from "./common/guards";
import { PrismaModule } from "./prisma/prisma.module";
import { LoggerMiddleware } from "middleware/logger";
import { StepModule } from "./step/step.module";
import { UserModule } from "./user/user.module";
import { LikeModule } from "./like/like.module";
import { BuildModule } from "./build/build.module";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		StepModule,
		UserModule,
		AuthModule,
		LikeModule,
		BuildModule
	],
	controllers: [],
	providers: [
		{
			provide: APP_GUARD,
			useClass: AtGuard
		}
	]
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(LoggerMiddleware).forRoutes("*");
	}
}
