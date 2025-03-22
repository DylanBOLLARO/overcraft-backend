import { Injectable } from '@nestjs/common'
import { CreateFavoriteDto } from './dto/create-favorite.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import * as _ from 'lodash'

@Injectable()
export class FavoritesService {
    constructor(private readonly prismaService: PrismaService) {}

    async create(createFavoriteDto: CreateFavoriteDto) {
        const isFavoriteAlreadyExist =
            (await this.prismaService.favorites.findFirst({
                where: createFavoriteDto,
            })) || null

        if (!_.isNull(isFavoriteAlreadyExist)) return

        return await this.prismaService.favorites.create({
            data: createFavoriteDto,
        })
    }

    async remove(id: string) {
        return await this.prismaService.favorites.delete({
            where: {
                id,
            },
        })
    }
}
