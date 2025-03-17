import { Controller, Get, Param, UseGuards } from '@nestjs/common'
import { UserService } from './user.service'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'

@UseGuards(AuthenticatedGuard)
@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':userId')
    findOne(@Param('userId') userId: string) {
        return this.userService.findOne(userId)
    }

    @Get(':userId/builds')
    findAll(@Param('userId') userId: string) {
        return this.userService.findAllBuildsOfUser(userId)
    }
}
