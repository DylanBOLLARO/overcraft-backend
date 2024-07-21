import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	ParseIntPipe
} from "@nestjs/common";
import { BuildPublicService } from "./build-public.service";
import { CreateBuildPublicDto } from "./dto/create-build-public.dto";
import { UpdateBuildPublicDto } from "./dto/update-build-public.dto";
import { Public } from "src/common/decorators";

@Public()
@Controller("build-public")
export class BuildPublicController {
	constructor(private readonly buildPublicService: BuildPublicService) {}

	// @Post()
	// create(@Body() createBuildPublicDto: CreateBuildPublicDto) {
	// 	return this.buildPublicService.create(createBuildPublicDto);
	// }

	@Get()
	async findAll() {
		return await this.buildPublicService.findAll();
	}

	@Get(":id")
	findOne(@Param("id", ParseIntPipe) id: number) {
		return this.buildPublicService.findOne(id);
	}

	@Get("all/:id")
	findAllOfUser(@Param("id", ParseIntPipe) id: number) {
		return this.buildPublicService.findAllOfUser(id);
	}

	// @Patch(":id")
	// update(
	// 	@Param("id") id: string,
	// 	@Body() updateBuildPublicDto: UpdateBuildPublicDto
	// ) {
	// 	return this.buildPublicService.update(+id, updateBuildPublicDto);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.buildPublicService.remove(+id);
	// }
}
