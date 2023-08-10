import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteLine {
    @IsNotEmpty()
    @IsNumberString()
    readonly id: string;
}
