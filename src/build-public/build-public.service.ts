import { Injectable } from "@nestjs/common";
import { CreateBuildPublicDto } from "./dto/create-build-public.dto";
import { UpdateBuildPublicDto } from "./dto/update-build-public.dto";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BuildPublicService {
	constructor(private readonly prismaService: PrismaService) {}

	// create(createBuildPublicDto: CreateBuildPublicDto) {
	// 	return "This action adds a new buildPublic";
	// }

	async findAll() {
		return await this.prismaService.build.findMany({
			where: {
				is_public: true
			}
		});
	}

	async findAllOfUser(user_id: number) {
		return await this.prismaService.build.findMany({
			where: {
				is_public: true,
				user_id
			}
		});
	}

	async findOne(id: number) {
		try {
			return await this.prismaService.build.findUniqueOrThrow({
				where: {
					id
				}
			});
		} catch (error) {
			console.error(error);
		}
	}

	// update(id: number, updateBuildPublicDto: UpdateBuildPublicDto) {
	// 	return `This action updates a #${id} buildPublic`;
	// }

	// remove(id: number) {
	// 	return `This action removes a #${id} buildPublic`;
	// }
}
