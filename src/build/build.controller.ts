import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	Logger,
	ParseIntPipe,
	UseGuards
} from "@nestjs/common";
import { BuildService } from "./build.service";
import { CreateBuildDto } from "./dto/create-build.dto";
import { UpdateBuildDto } from "./dto/update-build.dto";
import { GetCurrentUserId, Public } from "src/common/decorators";
import { AtGuard } from "src/common/guards";

@Controller("build")
export class BuildController {
	constructor(private readonly buildService: BuildService) {}

	@Public()
	@Get("public/all/:userId")
	async getAllPublicBuildsOfUserByUserId(@Param("userId") userId: any) {
		return await this.buildService.getAllPublicBuildsOfUserByUserId(userId);
	}

	@Public()
	@Get("public/all")
	async getAllPublicBuilds() {
		return await this.buildService.getAllPublicBuilds();
	}

	@UseGuards(AtGuard)
	@Get(":id")
	getBuildById(
		@Param("id", ParseIntPipe) buildId: number,
		@GetCurrentUserId() userId: number
	) {
		return this.buildService.getBuildById(buildId);
	}

	@Get()
	findAllOfOneUser(@GetCurrentUserId() userId: number) {
		return this.buildService.findAllOfOneUser(userId);
	}

	@Post()
	create(@Body() createBuild: CreateBuildDto) {
		return this.buildService.create(createBuild);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateBuildDto: UpdateBuildDto) {
		return this.buildService.update(+id, updateBuildDto);
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.buildService.delete(+id);
	}
}
