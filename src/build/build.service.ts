import { ConflictException, HttpStatus, Injectable } from "@nestjs/common";
import { PrismaService } from "src/prisma/prisma.service";

@Injectable()
export class BuildService {
	constructor(private readonly prismaService: PrismaService) {}

	private readonly slugify= (id: string | string, str: string) => {
		str = str.replace(/^\s+|\s+$/g, '')
		str = str.toLowerCase()
		str = str.replace(/[^a-z0-9 -]/g, '')
		str = str.replace(/\s+/g, '-')
		str = str.replace(/-+/g, '-')
		return `${id}-${str}`
	}
	
	async create(createBuild: any) {
		try {
			const created_build = await this.prismaService.build.create({
				data: {...createBuild, difficulty:+createBuild.difficulty}
			});

			const { id, name } = created_build;

			const patch = {
				slug: this.slugify(id, name)
			};

			this.update(id, patch);

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
					is_public: true,
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
					name: {
						...(q.length > 0
							? { contains: q, mode: "insensitive" }
							: {})
					}
				},
				include: {
					user: {
						select: {
							id: true,
						}
					},

				},

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

	async findOne(userId:string, buildId: string) {
		try {
			return await this.prismaService.build.findUnique({
				where: {
					id: buildId,
					OR:[
						{is_public:true},
						{ ...(userId ? { userId } : {}) }
					]
				},
				include: {
					steps: {
						orderBy: {
							position: "asc"
						}
					}
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

	async findAllStepsOfBuild(buildId: string, connectedUserId: string) {
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

			if (build.is_public || connectedUserId === build.userId) {
				return await this.prismaService.step.findMany({
					where: {
						buildId
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

	async update(id: string, updateBuildDto: any) {
		try {
			const { userId, is_public } = updateBuildDto;

			return this.prismaService.build.update({
				where: {
					id
				},
				data: {
					...updateBuildDto,
					userId,
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

	async remove(id: string) {
		return this.prismaService.build.delete({
			where: {
				id
			}
		});
	}
}
