import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common/pipes";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ["http://localhost:3000"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		preflightContinue: false,
		optionsSuccessStatus: 204,
		credentials: true
	});
	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3001);
}
bootstrap();
