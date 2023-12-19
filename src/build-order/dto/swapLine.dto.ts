import { IsNotEmpty, IsNumberString } from 'class-validator';

export class SwapLine {
    @IsNotEmpty()
    @IsNumberString()
    readonly id: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly buildId: string;
}
