import { Injectable } from "@nestjs/common";
import { CreateBuildPrivateDto } from "./dto/create-build-private.dto";
import { UpdateBuildPrivateDto } from "./dto/update-build-private.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BuildPrivateService {
	constructor(private readonly prismaService: PrismaService) {}

	// create(createBuildPrivateDto: CreateBuildPrivateDto) {
	// 	return "This action adds a new buildPrivate";
	// }

	async findAll(user_id: number) {
		return await this.prismaService.build.findMany({
			where: {
				user_id
			}
		});
	}

	async findOne(id: number, user_id: number) {
		return await this.prismaService.build.findUniqueOrThrow({
			where: {
				id,
				user_id
			}
		});
	}

	// update(id: number, updateBuildPrivateDto: UpdateBuildPrivateDto) {
	// 	return `This action updates a #${id} buildPrivate`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} buildPrivate`;
	// }
}
