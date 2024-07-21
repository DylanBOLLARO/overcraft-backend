import { Module } from "@nestjs/common";
import { BuildPublicService } from "./build-public.service";
import { BuildPublicController } from "./build-public.controller";

@Module({
	controllers: [BuildPublicController],
	providers: [BuildPublicService]
})
export class BuildPublicModule {}
