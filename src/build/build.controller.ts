import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe,
	Query
} from "@nestjs/common";
import { BuildService } from "./build.service";
import { CreateBuildDto } from "./dto/create-build.dto";
import { UpdateBuildDto } from "./dto/update-build.dto";
import { AuthenticatedGuard } from "src/common/guards/authenticated.guard";

@Controller("build")
export class BuildController {
	constructor(private readonly buildService: BuildService) {}

	@Post()
	create(@Body() createBuildDto: CreateBuildDto) {
		return this.buildService.create(createBuildDto);
	}

	@Get()
	async findAll(@Query() params: any) {
		return await this.buildService.findAll(params);
	}

	@UseGuards(AuthenticatedGuard)
	@Get(":buildId")
	async findOne(
		@Param("buildId") buildId: string
	) {
		return await this.buildService.findOne(buildId);
	}

	@Patch(":id")
	update(@Param("id") id: string, @Body() updateBuildDto: UpdateBuildDto) {
		return this.buildService.update(id, updateBuildDto)
	}

	@Delete(":id")
	remove(@Param("id") id: string) {
		return this.buildService.remove(id);
	}
}
