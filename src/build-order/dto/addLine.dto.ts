import { IsNotEmpty, IsNumberString } from 'class-validator';

export class AddLine {
    @IsNotEmpty()
    readonly desc: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly population: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly timer: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly buildName_id: string;
}
