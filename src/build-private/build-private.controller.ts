import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards,
	ParseIntPipe
} from "@nestjs/common";
import { BuildPrivateService } from "./build-private.service";
import { CreateBuildPrivateDto } from "./dto/create-build-private.dto";
import { UpdateBuildPrivateDto } from "./dto/update-build-private.dto";
import { AtGuard } from "src/common/guards";
import { GetCurrentUserId } from "src/common/decorators";

@UseGuards(AtGuard)
@Controller("build-private")
export class BuildPrivateController {
	constructor(private readonly buildPrivateService: BuildPrivateService) {}

	// @Post()
	// create(@Body() createBuildPrivateDto: CreateBuildPrivateDto) {
	// 	return this.buildPrivateService.create(createBuildPrivateDto);
	// }

	@Get()
	findAll(@GetCurrentUserId() userId: number) {
		return this.buildPrivateService.findAll(userId);
	}

	@Get(":id")
	findOne(
		@Param("id", ParseIntPipe) id: number,
		@GetCurrentUserId() userId: number
	) {
		return this.buildPrivateService.findOne(id, userId);
	}

	// @Patch(":id")
	// update(
	// 	@Param("id") id: string,
	// 	@Body() updateBuildPrivateDto: UpdateBuildPrivateDto
	// ) {
	// 	return this.buildPrivateService.update(+id, updateBuildPrivateDto);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.buildPrivateService.remove(+id);
	// }
}
