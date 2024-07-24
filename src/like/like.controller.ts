import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	UseGuards
} from "@nestjs/common";
import { LikeService } from "./like.service";
import { Public } from "src/common/decorators";
import { AtGuard } from "src/common/guards";

@Public()
@UseGuards(AtGuard)
@Controller("like")
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	// @Post()
	// create(@Body() createLikeDto: CreateLikeDto) {
	// 	return this.likeService.create(createLikeDto);
	// }

	@Get("number/:id")
	GetAllLikesOfUserByUserId(@Param("id") id: string) {
		return this.likeService.GetAllLikesOfUserByUserId(+id);
	}

	// @Patch(":id")
	// update(@Param("id") id: string, @Body() updateLikeDto: UpdateLikeDto) {
	// 	return this.likeService.update(+id, updateLikeDto);
	// }

	// @Delete(":id")
	// remove(@Param("id") id: string) {
	// 	return this.likeService.remove(+id);
	// }
}
