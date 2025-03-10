import { Injectable } from '@nestjs/common'
import { PrismaService } from 'src/prisma/prisma.service'
import { Prisma } from '@prisma/client'

@Injectable()
export class UserService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(data: any) {
        return await this.prismaService.user.create({ data })
    }

    async findOne(userId: string) {
        return this.prismaService.user.findUnique({
            where: {
                id: userId,
            },
            include: {
                build: true,
            },
        })
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
