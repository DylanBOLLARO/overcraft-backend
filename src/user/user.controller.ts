import {
    Controller,
    Get,
    Param,
    Delete,
    ParseIntPipe,
    UseGuards,
} from '@nestjs/common'
import { UserService } from './user.service'

@Controller('user')
export class UserController {
    constructor(private readonly userService: UserService) {}

    @Get(':userId') // get one user
    findOne(@Param('userId', ParseIntPipe) userId: string) {
        return this.userService.findOne(userId)
    }

    // @Get(':userId/build') // get all builds of one user
    // async findAllBuildsOfUser(
    //     @GetCurrentUserId() connectedUserId: number,
    //     @Param('userId', ParseIntPipe) userId: number
    // ) {
    //     return await this.userService.findAllBuildsOfUser(
    //         userId,
    //         connectedUserId
    //     )
    // }

    // @Get(':userId/build/:buildId') // get one build of one user
    // findOneBuildOfUser(
    //     @GetCurrentUserId() connectedUserId: number,
    //     @Param('userId', ParseIntPipe) userId: number,
    //     @Param('buildId', ParseIntPipe) buildId: number
    // ) {
    //     return this.userService.findOneBuildOfUser(
    //         userId,
    //         buildId,
    //         connectedUserId
    //     )
    // }

    // @Patch(":id") // update one user
    // update(@Param("id") id: string, @Body() updateUser: UpdateUserDto) {
    // 	return this.userService.update(+id, updateUser);
    // }

    @Delete(':userId') // delete one user
    delete(@Param('userId', ParseIntPipe) userId: string) {
        return this.userService.delete(userId)
    }
}
