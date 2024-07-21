import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBuildDto } from "./dto/create-build.dto";
import { UpdateBuildDto } from "./dto/update-build.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { slugify } from "src/utils";

@Injectable()
export class BuildService {
	constructor(private readonly prismaService: PrismaService) {}

	async create(createBuild: CreateBuildDto) {
		try {
			const { user_id } = createBuild;
			const created_build = await this.prismaService.build.create({
				data: {
					...createBuild,
					user_id: +user_id,
					created_by: +createBuild.created_by
				}
			});

			const { id: build_id, title } = created_build;

			const patch = {
				user_id: +user_id,
				slug: slugify(build_id, title)
			};

			await this.update(build_id, patch);

			return { ...created_build, ...patch };
		} catch (error) {
			console.error(error);
			throw new ConflictException({
				statusCode: HttpStatus.CONFLICT,
				message: error.message
			});
		}
	}

	async findAllOfOneUser(user_id?: number) {
		return this.prismaService.build.findMany({
			where: {
				user_id
			}
		});
	}

	async findOne(id: number) {
		return this.prismaService.build.findUniqueOrThrow({
			where: {
				id: +id
			}
		});
	}

	async update(id: number, updateBuild: any) {
		const { user_id, is_public } = updateBuild;
		return this.prismaService.build.update({
			where: {
				id
			},
			data: {
				...updateBuild,
				user_id: +user_id,
				is_public: "" + is_public === "true"
			}
		});
	}

	async delete(id: number) {
		return this.prismaService.build.delete({
			where: {
				id
			}
		});
	}

	// OVERCRAFT V2:
	// async findBuildsByConfig(config: any) {
	// 	const { id } = config;
	// 	return await this.prismaService.build.findUnique({
	// 		where: {
	// 			id: +id,
	// 			is_public: true
	// 		}
	// 	});
	// }

	async getAllPublicBuilds() {
		return await this.prismaService.build.findMany({
			where: {
				is_public: true
			}
		});
	}

	async getBuildById(buildId: number) {
		const build = await this.prismaService.build.findUnique({
			where: {
				id: buildId
			}
		});
		if (build.is_public) return build;
	}
}
