import { Module } from "@nestjs/common";
import { BuildService } from "./build.service";
import { BuildController } from "./build.controller";
import { UserService } from "src/user/user.service";
import { PrismaModule } from "src/prisma/prisma.module";
import { PrismaService } from "src/prisma/prisma.service";

@Module({
	controllers: [BuildController],
	providers: [BuildService, UserService, PrismaService]
})
export class BuildModule {}
