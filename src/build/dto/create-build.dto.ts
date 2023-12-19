import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateBuildDto {
    @IsNotEmpty()
    readonly title: string;

    @IsNotEmpty()
    readonly desc: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly playrace: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly versusrace: string;

    @IsNotEmpty()
    @IsNumberString()
    readonly User_id: string;
}

