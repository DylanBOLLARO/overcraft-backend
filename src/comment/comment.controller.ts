import { Controller, Post, Body, UseGuards, UsePipes } from "@nestjs/common";
import { CommentService } from "./comment.service";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { Public } from "src/common/decorators";
import { AtGuard } from "src/common/guards";
import { ValidationPipe } from "./pipe/create.comment.pipe";

@Public()
@UseGuards(AtGuard)
@Controller("comment")
export class CommentController {
	constructor(private readonly commentService: CommentService) {}

	@UsePipes(new ValidationPipe())
	@Post()
	create(@Body() createCommentDto: CreateCommentDto) {
		return this.commentService.create(createCommentDto);
	}
}
