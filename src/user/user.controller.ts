import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'

@UseGuards(AuthenticatedGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':userId/builds')
    async findAllBuilds(@Param('userId') userId: string) {
        return await this.userService.findAllBuildsOfUser(userId)
    }

    @Get(':userId/favorites')
    async findAllFavorites(@Param('userId') userId: string) {
        return await this.userService.findAllFavorites(userId)
    }
}
