import { Controller, Post, Body, HttpCode, HttpStatus, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { Public } from '../common/decorators';
import { SignupAuthDto } from './dto';
import { SigninAuthDto } from './dto/signin-auth.dto';
import { JwtService } from '@nestjs/jwt';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService,
    private readonly jwtService: JwtService) { }

  @Public()
  @Post('signup')
  @HttpCode(HttpStatus.CREATED)
  signup(@Body() signupAuth: SignupAuthDto) {
    return this.authService.signup(signupAuth);
  }

  @Public()
  @Post('signin')
  @HttpCode(HttpStatus.OK)
  signin(@Body() dto: SigninAuthDto, @Res({ passthrough: true }) res) {
    const payload = { username: 'john', id: 1 };
    res.cookie('user_token', this.jwtService.sign(payload), {
      expires: new Date(Date.now() + 3600000),
    });
    return this.authService.signin(dto);
  }
}
