import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetAllLines {
    @IsNotEmpty()
    @IsNumberString()
    readonly id: string;
}
