import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBuildDto } from "./dto/create-build.dto";
import { UpdateBuildDto } from "./dto/update-build.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma, Race } from "@prisma/client";

@Injectable()
export class BuildService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createBuild: CreateBuildDto) {
		try {
			const { user_id } = createBuild;
			return await this.prismaService.build.create({
				data: { ...createBuild, user_id: +user_id }
			});
		} catch (error) {
			throw new ConflictException({
				statusCode: HttpStatus.CONFLICT,
				message:
					error.message
			});
		}

	}

	async findAll(race?: Race) {
		return this.prismaService.build.findMany(
			race && {
				where: {
					race
				}
			}
		);
	}

	async findAllOfOneUser(user_id?: number) {
		return this.prismaService.build.findMany({
			where: {
				user_id,
			}
		})
	}

	async findOne(id: number) {
		return this.prismaService.build.findUniqueOrThrow({
			where: {
				id
			}
		});
	}

	async update(id: number, updateBuild: UpdateBuildDto) {
		const { user_id } = updateBuild;
		return this.prismaService.build.update({
			where: {
				id
			},
			data: { ...updateBuild, user_id: +user_id }
		});
	}

	async delete(id: number) {
		return this.prismaService.build.delete({
			where: {
				id
			}
		});
	}
}
