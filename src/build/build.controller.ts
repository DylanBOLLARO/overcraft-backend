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
	@Get("all")
	async getAllPublicBuilds() {
		return await this.buildService.getAllPublicBuilds();
	}

	@Public()
	@Get(":id")
	getPublicBuildById(@Param("id", ParseIntPipe) buildId: number) {
		return this.buildService.getBuildById(buildId);
	}

	// @Public()
	// @Get(":id")
	// findOne(@Param("id") id: string) {
	// 	return this.buildService.findOne(+id);
	// }

	// OVERCRAFT V2:
	// @Public()
	// @Get("config/:config")
	// findBuildsByConfig(@Param("config") config: string) {
	// 	return this.buildService.findBuildsByConfig(
	// 		qs.parse(config, { delimiter: ";" })
	// 	);
	// }

	@Post()
	create(@Body() createBuild: CreateBuildDto) {
		return this.buildService.create(createBuild);
	}

	@Get()
	findAllOfOneUser(@GetCurrentUserId() userId: number) {
		return this.buildService.findAllOfOneUser(userId);
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
