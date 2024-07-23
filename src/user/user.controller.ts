import {
	Controller,
	Get,
	Param,
	Delete,
	ParseIntPipe,
	UseGuards
} from "@nestjs/common";
import { UserService } from "./user.service";
import { GetCurrentUserId, Public } from "src/common/decorators";
import { AtGuard } from "src/common/guards";

@Public()
@UseGuards(AtGuard)
@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get() // get all users
	findAll() {
		return this.userService.findAll();
	}

	@Get(":userId") // get one user
	findOne(@Param("userId", ParseIntPipe) userId: number) {
		return this.userService.findOne(userId);
	}

	@Get("username/:username") // get one user
	findOneByUsername(@Param("username") username: string) {
		return this.userService.findOneByUsername(username);
	}

	@Get(":userId/build") // get all builds of one user
	async findAllBuildsOfUser(
		@GetCurrentUserId() connectedUserId: number,
		@Param("userId", ParseIntPipe) userId: number
	) {
		console.log("{ connectedUserId }");
		console.log({ connectedUserId });
		console.log({ userId });

		return await this.userService.findAllBuildsOfUser(
			userId,
			connectedUserId
		);
	}

	@Get(":userId/build/:buildId") // get one build of one user
	findOneBuildOfUser(
		@GetCurrentUserId() connectedUserId: number,
		@Param("userId", ParseIntPipe) userId: number,
		@Param("buildId", ParseIntPipe) buildId: number
	) {
		console.log({ connectedUserId });
		console.log({ userId });
		console.log({ buildId });
		return this.userService.findOneBuildOfUser(
			userId,
			buildId,
			connectedUserId
		);
	}

	// @Patch(":id") // update one user
	// update(@Param("id") id: string, @Body() updateUser: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUser);
	// }

	@Delete(":userId") // delete one user
	delete(@Param("userId", ParseIntPipe) userId: number) {
		return this.userService.delete(userId);
	}
}
