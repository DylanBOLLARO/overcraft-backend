import { IsNotEmpty, IsNumberString } from 'class-validator';

export class SwapLine {
    @IsNotEmpty()
    readonly table: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly id: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly buildId: string;
}
