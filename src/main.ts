import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common/pipes";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ["http://localhost:3000", "127.0.0.1"],
		methods: "GET,HEAD,PUT,PATCH,POST,DELETE",
		credentials: true,
		allowedHeaders: "Content-Type,Authorization",
	});

	app.useGlobalPipes(new ValidationPipe());
	await app.listen(3001);
}
bootstrap();
