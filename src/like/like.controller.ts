import {
	Controller,
	Post,
	Body,
	UseGuards,
	UsePipes,
	Delete,
	Param
} from "@nestjs/common";
import { LikeService } from "./like.service";
import { Public } from "src/common/decorators";
import { AtGuard } from "src/common/guards";
import { CreateLikeDto } from "./dto/create-like.dto";
import { ValidationPipe } from "./pipe/create.like.pipe";

@Public()
@UseGuards(AtGuard)
@Controller("like")
export class LikeController {
	constructor(private readonly likeService: LikeService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() createLikeDto: CreateLikeDto) {
		return this.likeService.create(createLikeDto);
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.likeService.delete(+id);
	}
}
