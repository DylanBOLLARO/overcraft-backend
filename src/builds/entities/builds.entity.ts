import { Race } from '@prisma/client'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class Builds {
    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    readonly description: string

    @IsNotEmpty()
    readonly race: Race

    @IsNotEmpty()
    @IsOptional()
    readonly v_race: Race

    @IsOptional()
    readonly slug?: string

    @IsNotEmpty()
    readonly userId: string
}
