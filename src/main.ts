import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common/pipes'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api/v1/')

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
        credentials: true,
    })

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(5000)
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
