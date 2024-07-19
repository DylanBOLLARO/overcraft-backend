import { ConflictException, HttpStatus, Injectable, Req } from "@nestjs/common";
import { CreateUserDto } from "./dto/create-user.dto";
import { PrismaService } from "src/prisma/prisma.service";
import * as bcrypt from "bcrypt";
import { Prisma, Role } from "@prisma/client";

@Injectable()
export class UserService {
	constructor(private readonly prismaService: PrismaService) {}

	async findAll(role?: Role) {
		return this.prismaService.user.findMany({
			where: role ? { role } : undefined,
			select: {
				id: true,
				first_name: true,
				last_name: true,
				username: true,
				email: true,
				created_at: true,
				updated_at: true,
				role: true
			}
		});
	}

	async findOne(id: number) {
		return this.prismaService.user.findUniqueOrThrow({
			where: {
				id
			},
			select: {
				id: true,
				first_name: true,
				last_name: true,
				username: true,
				email: true,
				created_at: true,
				updated_at: true,
				role: true
			}
		});
	}

	async update(id: number, updateEmployee: Prisma.UserUpdateInput) {
		return this.prismaService.user.update({
			where: {
				id
			},
			data: updateEmployee,
			select: {
				id: true,
				first_name: true,
				last_name: true,
				username: true,
				email: true,
				created_at: true,
				updated_at: true,
				role: true
			}
		});
	}

	async delete(id: number) {
		return this.prismaService.user.delete({
			where: {
				id
			},
			select: {
				id: true,
				first_name: true,
				last_name: true,
				username: true,
				email: true,
				created_at: true,
				updated_at: true,
				role: true
			}
		});
	}
}
