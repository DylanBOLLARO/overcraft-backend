import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common/pipes'
import * as session from 'express-session'
import * as passport from 'passport'
import * as cookieParser from 'cookie-parser'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api/v1/')

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
        credentials: true,
    })

    app.use(cookieParser())

    // Authentication & Session
    app.use(
        session({
            secret: process.env.SESSION_SECRET,
            resave: false,
            saveUninitialized: false,
            rolling: true,
            cookie: {
                maxAge: 30 * 60 * 1000,
                httpOnly: true,
            },
        })
    )
    app.use(passport.initialize())
    app.use(passport.session())

    app.useGlobalPipes(new ValidationPipe())

    await app.listen(5000)
    console.log(`Application is running on: ${await app.getUrl()}`)
}
bootstrap()
