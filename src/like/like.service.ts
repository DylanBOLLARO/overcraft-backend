import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikeService {
	constructor(private readonly prismaService: PrismaService) {}

	create(createLikeDto: CreateLikeDto) {
		return this.prismaService.like.create({
			data: createLikeDto
		});
	}
}
