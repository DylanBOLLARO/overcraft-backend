import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateCommentDto } from "./dto/create-comment.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class CommentService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createCommentDto: CreateCommentDto) {
		try {
			return this.prismaService.comment.create({
				data: createCommentDto
			});
		} catch ({ message }) {
			const err = {
				statusCode: HttpStatus.CONFLICT,
				message
			};
			console.error(err);
			throw new ConflictException(err);
		}
	}
}
