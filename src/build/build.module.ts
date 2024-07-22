import { Module } from "@nestjs/common";
import { BuildService } from "./build.service";
import { BuildController } from "./build.controller";
import { UserService } from "src/user/user.service";

@Module({
	controllers: [BuildController],
	providers: [BuildService, UserService]
})
export class BuildModule {}
