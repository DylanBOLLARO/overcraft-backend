import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common/pipes";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.enableCors({
		origin: ["127.0.0.1:3000", "127.0.0.1", "overcraft.ovh", "localhost", "localhost:3000"],
		methods: "*",
		credentials: true,
		allowedHeaders: "Content-Type,Authorization",
	});

	app.useGlobalPipes(new ValidationPipe());
	await app.listen(5000);
}
bootstrap();
