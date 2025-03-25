import { StepVariants } from '@prisma/client'
import { IsNotEmpty, IsOptional } from 'class-validator'

export class CreateStepDto {
    @IsNotEmpty()
    readonly description: string

    @IsNotEmpty()
    readonly population: number

    @IsNotEmpty()
    readonly timer: number

    @IsNotEmpty()
    readonly buildId: string

    @IsNotEmpty()
    readonly position: number

    @IsOptional()
    readonly variant: StepVariants
}
