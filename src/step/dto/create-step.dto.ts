import { IsNotEmpty, IsNumberString } from 'class-validator'

export class CreateStepDto {
    @IsNotEmpty()
    readonly description: string

    @IsNotEmpty()
    @IsNumberString()
    readonly population: string

    @IsNotEmpty()
    @IsNumberString()
    readonly timer: string

    @IsNotEmpty()
    readonly buildId: string

    @IsNotEmpty()
    @IsNumberString()
    readonly position: string
}
