import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { CreateBuildDto } from "./dto/create-build.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { slugify } from "src/utils";
import { link } from "fs";

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

	async findAll(params: any) {
		const { race, v_race, difficulty, type, q, sorted } = params;

		const raceUpper = race?.toUpperCase();
		const vRaceUpper = v_race?.toUpperCase();

		try {
			return await this.prismaService.build.findMany({
				where: {
					race: {
						...(["PROTOSS", "TERRAN", "ZERG"].includes(raceUpper)
							? { equals: raceUpper }
							: {})
					},
					v_race: {
						...(["PROTOSS", "TERRAN", "ZERG"].includes(vRaceUpper)
							? { equals: vRaceUpper }
							: {})
					},
					difficulty: {
						...(["1", "2", "3"].includes(difficulty)
							? { equals: +difficulty }
							: {})
					},
					type: {
						...(["macro", "cheese", "allin"].includes(type)
							? { equals: type }
							: {})
					},
					title: {
						...(q.length > 0
							? { contains: q, mode: "insensitive" }
							: {})
					}
				},
				include: {
					user: {
						select: {
							id: true,
							username: true
						}
					},
					_count: {
						select: {
							like: true,
							comment: true
						}
					}
				},
				orderBy: {
					like: {
						_count: "desc"
					}
				},
				...(sorted === "mostlike"
					? {
							orderBy: {
								like: {
									_count: "desc"
								}
							}
					  }
					: {}),

				...(sorted === "mostdifficult"
					? {
							orderBy: {
								difficulty: "desc"
							}
					  }
					: {}),
				...(sorted === "leastdifficult"
					? {
							orderBy: {
								difficulty: "asc"
							}
					  }
					: {})
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

	async findOne(buidId: number, connectedUserId: number) {
		try {
			return await this.prismaService.build.findUniqueOrThrow({
				where: {
					id: buidId,
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
				},
				include: {
					user: {
						select: {
							id: true,
							username: true
						}
					},
					comment: {
						include: {
							user: {
								select: {
									id: true,
									username: true
								}
							}
						}
					},
					_count: {
						select: {
							like: true,
							comment: true
						}
					},
					steps: true
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

	async findAllStepsOfBuild(buildId: number, connectedUserId: number) {
		try {
			const build = await this.prismaService.build.findUnique({
				where: {
					id: buildId
				}
			});
			if (!build) {
				throw new ConflictException({
					statusCode: HttpStatus.BAD_REQUEST,
					message: "This build does not exist"
				});
			}

			if (build.is_public || connectedUserId === build.user_id) {
				return await this.prismaService.step.findMany({
					where: {
						build_id: buildId
					}
				});
			} else {
				throw new ConflictException({
					statusCode: HttpStatus.UNAUTHORIZED,
					message: "Access Denied"
				});
			}
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
