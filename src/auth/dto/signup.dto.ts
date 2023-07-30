import { IsNotEmpty, IsEmail } from 'class-validator';

export class SignupDto {
    @IsNotEmpty()
    @IsEmail()
    readonly email: string;

    @IsNotEmpty()
    readonly username: string;

    @IsNotEmpty()
    readonly password: string;
}
