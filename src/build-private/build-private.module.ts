import { Module } from "@nestjs/common";
import { BuildPrivateService } from "./build-private.service";
import { BuildPrivateController } from "./build-private.controller";

@Module({
	controllers: [BuildPrivateController],
	providers: [BuildPrivateService]
})
export class BuildPrivateModule {}
