// auth/auth.controller.ts
import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { LoginGuard } from './login.guard'
import { Issuer } from 'openid-client'
import { PrismaService } from 'src/prisma/prisma.service'

@Controller()
export class AuthController {
    constructor(private readonly prismaService: PrismaService) {}

    @UseGuards(LoginGuard)
    @Get('/auth/login')
    login() {}

    @Get('/auth/user')
    async user(@Request() req) {
        const userId = req?.user?.userinfo?.sub ?? null

        if (!userId) return

        let userExist: any = await this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
        })

        if (!userExist) {
            const { name, family_name, given_name, preferred_username, email } =
                req?.user?.userinfo

            userExist = await this.prismaService.user.create({
                data: {
                    email,
                    name,
                    family_name,
                    given_name,
                    preferred_username,
                    id: userId,
                },
            })
        }

        return {
            ...req.user,
            userinfo: { ...req.user.userinfo, ...userExist },
        }
    }

    @UseGuards(LoginGuard)
    @Get('/callback')
    loginCallback(@Res() res: Response) {
        res.redirect('http://localhost:3000')
    }

    @Get('/auth/logout')
    async logout(@Request() req, @Res() res: Response) {
        const id_token = req.user ? req.user.id_token : undefined

        req.logout(function (err) {
            req.session.destroy(async (error: any) => {
                const TrustIssuer = await Issuer.discover(
                    `${process.env.OAUTH2_CLIENT_PROVIDER_OIDC_ISSUER}/.well-known/openid-configuration`
                )
                const end_session_endpoint =
                    TrustIssuer.metadata.end_session_endpoint

                if (end_session_endpoint && id_token) {
                    res.redirect(
                        `${end_session_endpoint}?post_logout_redirect_uri=${process.env.OAUTH2_CLIENT_REGISTRATION_LOGIN_POST_LOGOUT_REDIRECT_URI}${id_token ? '&id_token_hint=' + id_token : ''}`
                    )
                } else {
                    res.redirect('/')
                }
            })
        })
    }
}
