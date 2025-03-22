import { Race } from '@prisma/client'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateBuildDto {
    @IsNotEmpty()
    readonly name: string

    @IsNotEmpty()
    readonly description: string

    @IsNotEmpty()
    readonly race: Race

    @IsNotEmpty()
    readonly v_race: Race

    @IsOptional()
    readonly slug?: string

    @IsNotEmpty()
    readonly userId: string

    @IsOptional()
    readonly steps?: string
}
