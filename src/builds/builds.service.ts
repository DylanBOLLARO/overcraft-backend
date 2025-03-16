import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { ResponseFormat } from 'src/constants'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class BuildsService {
    constructor(private readonly prismaService: PrismaService) {}

    private readonly slugify = (id: string | string, str: string) => {
        str = str.replace(/^\s+|\s+$/g, '')
        str = str.toLowerCase()
        str = str.replace(/[^a-z0-9 -]/g, '')
        str = str.replace(/\s+/g, '-')
        str = str.replace(/-+/g, '-')
        return `${id}-${str}`
    }

    async create(createBuild: any) {
        try {
            const created_build = await this.prismaService.builds.create({
                data: { ...createBuild, difficulty: +createBuild.difficulty },
            })

            const { id, name } = created_build

            const patch = {
                slug: this.slugify(id, name),
            }

            this.update(id, patch)

            return { ...created_build, ...patch }
        } catch ({ message }) {
            const err = {
                statusCode: HttpStatus.CONFLICT,
                message,
            }
            console.error(err)
            throw new ConflictException(err)
        }
    }

    async findAll(params: any) {
        const {
            race = 'all',
            v_race = 'all',
            query = '',
            take = 18,
            page = 1,
        } = params

        const raceUpper = race?.toUpperCase()
        const vRaceUpper = v_race?.toUpperCase()

        try {
            const data = await this.prismaService.builds.findMany({
                take: 18,
                skip: page > 0 ? take * (page - 1) : 0,
                where: {
                    is_public: true,
                    race: {
                        ...(['PROTOSS', 'TERRAN', 'ZERG'].includes(raceUpper)
                            ? { equals: raceUpper }
                            : {}),
                    },
                    v_race: {
                        ...(['PROTOSS', 'TERRAN', 'ZERG'].includes(vRaceUpper)
                            ? { equals: vRaceUpper }
                            : {}),
                    },
                    name: {
                        ...(query?.length > 0
                            ? { contains: query, mode: 'insensitive' }
                            : {}),
                    },
                },
                include: {
                    user: {
                        select: {
                            id: true,
                        },
                    },
                },
            })

            const totalItems = await this.prismaService.builds.count({
                where: {
                    is_public: true,
                    race: {
                        ...(['PROTOSS', 'TERRAN', 'ZERG'].includes(raceUpper)
                            ? { equals: raceUpper }
                            : {}),
                    },
                    v_race: {
                        ...(['PROTOSS', 'TERRAN', 'ZERG'].includes(vRaceUpper)
                            ? { equals: vRaceUpper }
                            : {}),
                    },
                    name: {
                        ...(query?.length > 0
                            ? { contains: query, mode: 'insensitive' }
                            : {}),
                    },
                },
            })

            return {
                [ResponseFormat.data]: data,
                [ResponseFormat.totalItems]: totalItems,
                [ResponseFormat.take]: +take,
                [ResponseFormat.page]: +page,
            }
        } catch ({ message }) {
            const err = {
                statusCode: HttpStatus.CONFLICT,
                message,
            }
            console.error(err)
            throw new ConflictException(err)
        }
    }

    async findOne(userId: string, buildId: string) {
        try {
            return await this.prismaService.builds.findUnique({
                where: {
                    id: buildId,
                    OR: [
                        { is_public: true },
                        { ...(userId ? { userId } : {}) },
                    ],
                },
                include: {
                    steps: {
                        orderBy: {
                            position: 'asc',
                        },
                    },
                },
            })
        } catch ({ message }) {
            const err = {
                statusCode: HttpStatus.CONFLICT,
                message,
            }
            console.error(err)
            throw new ConflictException(err)
        }
    }

    async findAllStepsOfBuild(buildId: string, connectedUserId: string) {
        try {
            const build = await this.prismaService.builds.findUnique({
                where: {
                    id: buildId,
                },
            })
            if (!build) {
                throw new ConflictException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'This build does not exist',
                })
            }

            if (build.is_public || connectedUserId === build.userId) {
                return await this.prismaService.step.findMany({
                    where: {
                        buildId,
                    },
                })
            } else {
                throw new ConflictException({
                    statusCode: HttpStatus.UNAUTHORIZED,
                    message: 'Access Denied',
                })
            }
        } catch ({ message }) {
            const err = {
                statusCode: HttpStatus.CONFLICT,
                message,
            }
            console.error(err)
            throw new ConflictException(err)
        }
    }

    async update(id: string, updateBuildDto: any) {
        try {
            const { userId, is_public } = updateBuildDto

            return this.prismaService.builds.update({
                where: {
                    id,
                },
                data: {
                    ...updateBuildDto,
                    userId,
                    is_public: '' + is_public === 'true',
                },
            })
        } catch ({ message }) {
            const err = {
                statusCode: HttpStatus.CONFLICT,
                message,
            }
            console.error(err)
            throw new ConflictException(err)
        }
    }

    async remove(id: string) {
        return this.prismaService.builds.delete({
            where: {
                id,
            },
        })
    }
}
