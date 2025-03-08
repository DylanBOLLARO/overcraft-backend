import { IsEmail, IsNotEmpty } from 'class-validator'

export class CreateUserDto {
    @IsNotEmpty()
    readonly username: string

    @IsNotEmpty()
    @IsEmail()
    readonly email: string

    @IsNotEmpty()
    readonly password: string

    @IsNotEmpty()
    readonly first_name: string

    @IsNotEmpty()
    readonly last_name: string
}
