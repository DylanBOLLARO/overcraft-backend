import { Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentService {
	constructor(private readonly prismaService: PrismaService) {}

	create(createCommentDto: CreateCommentDto) {
		return this.prismaService.comment.create({
			data: createCommentDto
		});
	}
}
