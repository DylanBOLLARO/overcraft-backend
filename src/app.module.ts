import { MiddlewareConsumer, Module } from "@nestjs/common";
import { PrismaModule } from "./prisma/prisma.module";
import { ConfigModule } from "@nestjs/config";
import { BuildModule } from "./build/build.module";
import { StepModule } from "./step/step.module";
import { UserModule } from "./user/user.module";
import { RequestLoggerMiddleware } from "middleware/logger";

@Module({
	imports: [
		ConfigModule.forRoot({ isGlobal: true }),
		PrismaModule,
		BuildModule,
		StepModule,
		UserModule
	],
	controllers: [],
	providers: []
})
export class AppModule {
	configure(consumer: MiddlewareConsumer) {
		consumer.apply(RequestLoggerMiddleware).forRoutes("*");
	}
}
