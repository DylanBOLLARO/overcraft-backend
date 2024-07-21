import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete,
	Query,
	Req,
	ConflictException,
	HttpStatus
} from "@nestjs/common";
import { UserService } from "./user.service";
import { CreateUserDto } from "./dto/create-user.dto";
import { UpdateUserDto } from "./dto/update-user.dto";
import { Role } from "@prisma/client";
import { Request } from "express";
import { Public } from "src/common/decorators";
import * as qs from "qs";

@Controller("user")
export class UserController {
	constructor(private readonly userService: UserService) {}

	@Get()
	findAll(@Query("role") role?: Role) {
		return this.userService.findAll(role);
	}

	@Public()
	@Get("username/:username")
	findOneByUsername(@Param("username") username: string) {
		return this.userService.findOneByUsername(username.toLowerCase());
	}

	@Public()
	@Get("config/:config")
	findUserByConfig(@Param("config") config: string) {
		return this.userService.findUserByConfig(
			qs.parse(config, { delimiter: ";" })
		);
	}

	@Get(":id")
	findOne(@Param("id") id: string) {
		console.log("first");
		return this.userService.findOne(+id);
	}

	// @Patch(":id")
	// update(@Param("id") id: string, @Body() updateUser: UpdateUserDto) {
	// 	return this.userService.update(+id, updateUser);
	// }

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.userService.delete(+id);
	}
}
