import { IsNotEmpty, IsString } from "class-validator";

export class SigninAuthDto {
	@IsNotEmpty()
	@IsString()
	email: string;

	@IsNotEmpty()
	@IsString()
	password: string;
}
