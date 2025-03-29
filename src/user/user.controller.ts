import { Body, Controller, Get, Param, Patch, UseGuards } from '@nestjs/common'
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

    @Patch(':id')
    async update(@Param('id') id: string, @Body() profile: any) {
        return await this.userService.patchProfile(id, profile)
    }
}
