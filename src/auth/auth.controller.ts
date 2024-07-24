import {
	Body,
	Controller,
	Get,
	HttpCode,
	HttpStatus,
	Post,
	UseGuards
} from "@nestjs/common";
import { AuthService } from "./auth.service";
import { GetCurrentUser, GetCurrentUserId, Public } from "../common/decorators";
import { SignupAuthDto } from "./dto";
import { SigninAuthDto } from "./dto/signin-auth.dto";
import { AtGuard, RtGuard } from "src/common/guards";

@Public()
@UseGuards(AtGuard)
@Controller("auth")
export class AuthController {
	constructor(private authService: AuthService) {}

	@Public()
	@Post("signup")
	@HttpCode(HttpStatus.CREATED)
	async signup(@Body() signup: SignupAuthDto) {
		return await this.authService.signup(signup);
	}

	@Public()
	@Post("signin")
	@HttpCode(HttpStatus.OK)
	async signin(@Body() signin: SigninAuthDto) {
		return await this.authService.signin(signin);
	}

	// @UseGuards(AtGuard)
	// @Post("me")
	// @HttpCode(HttpStatus.OK)
	// verifyToken(@GetCurrentUser() user: any) {
	// 	return user;
	// }

	@UseGuards(AtGuard)
	@Post("get-connected-user-id")
	@HttpCode(HttpStatus.OK)
	async me(@GetCurrentUserId() userId: any) {
		return await this.authService.me(userId);
	}

	@Post("logout")
	@HttpCode(HttpStatus.OK)
	async logout(@GetCurrentUserId() userId: number): Promise<boolean> {
		return await this.authService.logout(userId);
	}

	@Public()
	@UseGuards(RtGuard)
	@Post("refresh")
	@HttpCode(HttpStatus.OK)
	async refreshTokens(
		@GetCurrentUserId() userId: number,
		@GetCurrentUser("refreshToken") refreshToken: string
	) {
		return await this.authService.refreshTokens(userId, refreshToken);
	}
}
