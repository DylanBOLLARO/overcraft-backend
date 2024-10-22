import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";
import { Prisma } from "@prisma/client";

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}
	selectConfig = {
		select: {
			id: true,
			first_name: true,
			last_name: true,
			username: true,
			email: true,
			created_at: true,
			updated_at: true,
			role: true,
			description: true
		}
	};

	async findAll() {
		return this.prismaService.user.findMany(this.selectConfig);
	}

	async findOne(id: number) {
		return this.prismaService.user.findUniqueOrThrow({
			where: {
				id
			},
			...{
				select: {
					...this.selectConfig.select,
					_count: {
						select: {
							build: true,
							like: true
						}
					},
					build: {
						include: {
							_count: {
								select: {
									like: true,
									comment: true,
									steps: true
								}
							}
						}
					}
				}
			}
		});
	}

	async findOneByUsername(username: string) {
		return this.prismaService.user.findFirstOrThrow({
			where: {
				username: {
					equals: username,
					mode: "insensitive"
				}
			},
			...{
				select: {
					...this.selectConfig.select,
					_count: {
						select: {
							build: true,
							like: true
						}
					},
					build: {
						include: {
							_count: {
								select: {
									like: true,
									comment: true,
									steps: true
								}
							}
						}
					}
				}
			}
		});
	}

	async findAllBuildsOfUser(userId: number, connectedUserId: number) {
		try {
			return await this.prismaService.build.findMany({
				where: {
					user_id: userId,
					OR: [
						{
							is_public: true
						},
						{
							user_id: {
								equals: connectedUserId
							}
						}
					]
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

	async findOneBuildOfUser(
		userId: number,
		buildId: number,
		connectedUserId: number
	) {
		try {
			return await this.prismaService.build.findUniqueOrThrow({
				where: {
					id: buildId,
					user_id: userId,
					OR: [
						{
							is_public: true
						},
						{
							user_id: {
								equals: connectedUserId
							}
						}
					]
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

	async update(id: number, updateEmployee: Prisma.UserUpdateInput) {
		return this.prismaService.user.update({
			where: {
				id
			},
			data: updateEmployee,
			...this.selectConfig
		});
	}

	async delete(id: number) {
		return this.prismaService.user.delete({
			where: {
				id
			},
			...this.selectConfig
		});
	}
}
