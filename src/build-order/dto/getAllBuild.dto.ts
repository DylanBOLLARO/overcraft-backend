import { IsNotEmpty, IsNumberString } from 'class-validator';

export class GetAllBuild {
    @IsNotEmpty()
    @IsNumberString()
    readonly id: string;
}
