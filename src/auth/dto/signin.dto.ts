import { IsNotEmpty, IsEmail } from 'class-validator';

export class SigninDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly password: string;
}
