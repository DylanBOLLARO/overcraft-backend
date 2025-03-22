import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async findAllFavorites(userId: string) {
        return await this.prismaService.builds.findMany({
            where: {
                favorites: {
                    some: {
                        userId,
                    },
                },
            },
        })
    }

    async findAllBuildsOfUser(userId: string) {
        return await this.prismaService.builds.findMany({
            where: {
                userId,
            },
        })
    }
}
