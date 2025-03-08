// auth/auth.controller.ts
import { Controller, Get, Request, Res, UseGuards } from '@nestjs/common'
import { Response } from 'express'

import { LoginGuard } from './login.guard'
import { Issuer } from 'openid-client'
import { UserService } from 'src/user/user.service'

@Controller()
export class AuthController {
    constructor(private readonly userService: UserService) {}

    private createUser = async (data: any) => {
        return await this.userService.create(data)
    }

    private doesUserExist = async (email: string) => {
        return await this.userService.findOne(email)
    }

    @UseGuards(LoginGuard)
    @Get('/login')
    login() {}

    @Get('/user')
    async user(@Request() req) {
        if (!req.user) return

        let userExist: any = await this.doesUserExist(
            req?.user?.userinfo?.email
        )
        if (!userExist && req?.user?.userinfo) {
            const { name, family_name, given_name, preferred_username, email } =
                req?.user?.userinfo

            userExist = await this.createUser({
                email,
                name,
                family_name,
                given_name,
                preferred_username,
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

    @Get('/logout')
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
