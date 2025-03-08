import { IsEnum, IsNotEmpty, IsNumberString } from 'class-validator'

export enum MOVE {
    UP = 'UP',
    DOWN = 'DOWN',
}

export class MovePositionStepDto {
    @IsNotEmpty()
    @IsNumberString()
    readonly id: string

    @IsNotEmpty()
    readonly buildId: string

    @IsNotEmpty()
    @IsEnum(MOVE)
    readonly move: MOVE
}
