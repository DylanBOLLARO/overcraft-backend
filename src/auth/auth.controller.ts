import { Body, Controller, Post, Delete, UseGuards } from '@nestjs/common';
import { AuthService } from './auth.service';
import { SignupDto } from './dto/signup.dto';
import { SigninDto } from './dto/signin.dto';
import { AuthGuard } from '@nestjs/passport';

@Controller('auth')
export class AuthController {
    constructor(private readonly authService: AuthService) {}
    @Post('signup')
    signup(@Body() signupDto: SignupDto) {
        return this.authService.signup(signupDto);
    }

    @Post('signin')
    signin(@Body() signinDto: SigninDto) {
        return this.authService.signin(signinDto);
    }

    // @UseGuards(AuthGuard('jwt'))
    // @Delete('delete')
    // deleteAccount() {
    //     return 'Account Deleted';
    // }
}
