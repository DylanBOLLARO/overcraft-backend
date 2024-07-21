import { PartialType } from "@nestjs/mapped-types";
import { CreateBuildPublicDto } from "./create-build-public.dto";

export class UpdateBuildPublicDto extends PartialType(CreateBuildPublicDto) {}
