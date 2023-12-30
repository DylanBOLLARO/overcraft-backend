import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	Logger
} from "@nestjs/common";
import { BuildService } from "./build.service";
import { CreateBuildDto } from "./dto/create-build.dto";
import { UpdateBuildDto } from "./dto/update-build.dto";
import { GetCurrentUserId, Public } from "src/common/decorators";
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

	@Public()
	@Get("all")
	findAll() {
		return this.buildService.findAll();
	}

	@Public()
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
