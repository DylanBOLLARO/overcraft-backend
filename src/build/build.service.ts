import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBuildDto } from "./dto/create-build.dto";
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
					user_id: +user_id
				}
			});

			const { id: build_id, title } = created_build;

			const patch = {
				user_id: +user_id,
				slug: slugify(build_id, title)
			};

			this.update(build_id, patch);

			return { ...created_build, ...patch };
		} catch ({ message }) {
			const err = {
				statusCode: HttpStatus.CONFLICT,
				message
			};
			console.error(err);
			throw new ConflictException(err);
		}
	}

	async findAll() {
		try {
			return await this.prismaService.build.findMany({
				where: {
					is_public: true
				}
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

	async findOne(id: number) {
		try {
			return await this.prismaService.build.findUniqueOrThrow({
				where: {
					is_public: true,
					id
				}
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

	async update(id: number, updateBuildDto: any) {
		try {
			const { user_id, is_public } = updateBuildDto;

			return this.prismaService.build.update({
				where: {
					id
				},
				data: {
					...updateBuildDto,
					user_id: +user_id,
					is_public: "" + is_public === "true"
				}
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

	async remove(id: number) {
		return this.prismaService.build.delete({
			where: {
				id
			}
		});
	}
}
