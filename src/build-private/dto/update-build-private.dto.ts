import { PartialType } from "@nestjs/mapped-types";
import { CreateBuildPrivateDto } from "./create-build-private.dto";

export class UpdateBuildPrivateDto extends PartialType(CreateBuildPrivateDto) {}
