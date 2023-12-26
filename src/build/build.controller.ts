import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query
} from "@nestjs/common";
import { BuildService } from "./build.service";
import { CreateBuildDto } from "./dto/create-build.dto";
import { UpdateBuildDto } from "./dto/update-build.dto";
import { Race } from "@prisma/client";
import { GetCurrentUserId } from "src/common/decorators";

@Controller("build")
export class BuildController {
	constructor(private readonly buildService: BuildService) {}

	@Post()
	create(@Body() createBuild: CreateBuildDto) {
		return this.buildService.create(createBuild);
	}

	@Get()
	findAllOfOneUser(@GetCurrentUserId() userId: number) {
		return this.buildService.findAllOfOneUser(userId);
	}

	// @Get()
	// findAll(@Query("race") race?: Race) {
	// 	return this.buildService.findAll(race);
	// }

	@Get(":id")
	findOne(@Param("id") id: string) {
		return this.buildService.findOne(+id);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateBuildDto: UpdateBuildDto) {
		return this.buildService.update(+id, updateBuildDto);
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		console.log(id);
		return this.buildService.delete(+id);
	}
}
