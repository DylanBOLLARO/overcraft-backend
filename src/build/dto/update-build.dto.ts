import { PartialType } from "@nestjs/mapped-types";
import { CreateBuildDto } from "./create-build.dto";
import { IsBooleanString } from "class-validator";

export class UpdateBuildDto extends PartialType(CreateBuildDto) {
    @IsBooleanString()
    readonly is_public: boolean;
}
