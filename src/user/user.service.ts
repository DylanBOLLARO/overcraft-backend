import { ConflictException, HttpStatus, Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: any) {
        return this.prismaService.user.create({ data })
    }

    async findOne(email: string) {
        return this.prismaService.user.findUnique({
            where: {
                email,
            },
        })
    }

    async findAllBuildsOfUser(userId: string, connectedUserId: string) {
        try {
            return await this.prismaService.build.findMany({
                where: {
                    userId,
                    OR: [
                        {
                            is_public: true,
                        },
                        {
                            userId: {
                                equals: connectedUserId,
                            },
                        },
                    ],
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

    async findOneBuildOfUser(
        userId: string,
        buildId: string,
        connectedUserId: string
    ) {
        try {
            return await this.prismaService.build.findUniqueOrThrow({
                where: {
                    id: buildId,
                    userId,
                    OR: [
                        {
                            is_public: true,
                        },
                        {
                            userId: {
                                equals: connectedUserId,
                            },
                        },
                    ],
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

    async update(id: string, updateEmployee: Prisma.UserUpdateInput) {
        return this.prismaService.user.update({
            where: {
                id,
            },
            data: updateEmployee,
        })
    }

    async delete(id: string) {
        return this.prismaService.user.delete({
            where: {
                id,
            },
        })
    }
}
