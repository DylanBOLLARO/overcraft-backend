import { NestFactory } from '@nestjs/core'
import { AppModule } from './app.module'
import { ValidationPipe } from '@nestjs/common/pipes'
import * as session from 'express-session'
import * as passport from 'passport'

async function bootstrap() {
    const app = await NestFactory.create(AppModule)
    app.setGlobalPrefix('api/v1/')

    app.enableCors({
        origin: true,
        methods: ['GET', 'POST', 'PUT', 'DELETE', 'HEAD', 'PATCH'],
        credentials: true,
    })

    // Authentication & Session
    app.use(
        session({
            secret: process.env.SESSION_SECRET, // to sign session id
            resave: false, // will default to false in near future: https://github.com/expressjs/session#resave
            saveUninitialized: false, // will default to false in near future: https://github.com/expressjs/session#saveuninitialized
            rolling: true, // keep session alive
            cookie: {
                maxAge: 30 * 60 * 1000, // session expires in 1hr, refreshed by `rolling: true` option.
                httpOnly: true, // so that cookie can't be accessed via client-side script
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
