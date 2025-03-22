import {
    Controller,
    Post,
    Body,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { FavoritesService } from './favorites.service'
import { CreateFavoriteDto } from './dto/create-favorite.dto'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'

@UseGuards(AuthenticatedGuard)
@Controller('favorites')
export class FavoritesController {
    constructor(private readonly favoritesService: FavoritesService) {}

    @Post()
    async create(@Body() createFavoriteDto: CreateFavoriteDto) {
        return await this.favoritesService.create(createFavoriteDto)
    }

    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.favoritesService.remove(id)
    }
}
