import { IsNotEmpty, IsNumberString } from 'class-validator';

export class DeleteBuild {
    @IsNotEmpty()
    @IsNumberString()
    readonly id: string;
}
