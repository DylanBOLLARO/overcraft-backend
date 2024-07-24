import { Injectable } from "@nestjs/common";
import { CreateLikeDto } from "./dto/create-like.dto";
import { UpdateLikeDto } from "./dto/update-like.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class LikeService {
	constructor(private readonly prismaService: PrismaService) {}

	create(createLikeDto: CreateLikeDto) {
		return this.prismaService.like.create({
			data: createLikeDto
		});
	}

	async GetAllLikesOfUserByUserId(user_id: number) {
		return (
			await this.prismaService.like.findMany({
				where: {
					user_id
				}
			})
		).length;
	}

	// findOne(id: number) {
	// 	return `This action returns a #${id} like`;
	// }

	// update(id: number, updateLikeDto: UpdateLikeDto) {
	// 	return `This action updates a #${id} like`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} like`;
	// }
}
