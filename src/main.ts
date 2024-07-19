import { NestFactory } from "@nestjs/core";
import { AppModule } from "./app.module";
import { ValidationPipe } from "@nestjs/common/pipes";

async function bootstrap() {
	const app = await NestFactory.create(AppModule);
	app.setGlobalPrefix("api/");
	app.enableCors({
		origin: true,
		methods: ["GET", "POST", "PUT", "DELETE", "HEAD", "PATCH"],
		credentials: true,
		allowedHeaders: "Content-Type,Authorization"
	});

	app.useGlobalPipes(new ValidationPipe());
	await app.listen(25000);
	console.log(`Application is running on: ${await app.getUrl()}`);
}
bootstrap();
