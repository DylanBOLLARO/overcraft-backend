import { ConflictException, HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { PrismaService } from 'src/prisma/prisma.service';
import * as bcrypt from 'bcrypt';
import { Prisma, Role } from '@prisma/client';

@Injectable()
export class UserService {
	constructor(
		private readonly prismaService: PrismaService,
	) { }

	async create(createUser: CreateUserDto) {
		const { email, password } = createUser;

		const user = await this.prismaService.user.findFirst({
			where: { email }
		});

		if (user) throw new ConflictException({
			"statusCode": HttpStatus.CONFLICT,
			"message": "The provided email address is already in use. Please use a different email for registration."
		});

		const hashPassword = bcrypt.hashSync(password, 10);

		const createdUser = await this.prismaService.user.create({
			data: { ...createUser, password: hashPassword },
			select: {
				id: true,
				firstName: true,
				lastName: true,
				username: true,
				email: true,
				createdAt: true,
				updatedAt: true,
				role: true,
			},
		});

		return createdUser
	}

	async findAll(role?: Role) {
		return this.prismaService.user.findMany(role && {
			where: {
				role,
			}
		})
	}

	async findOne(id: number) {
		return this.prismaService.user.findUniqueOrThrow({
			where: {
				id,
			}
		})
	}

	async update(id: number, updateEmployee: Prisma.UserUpdateInput) {
		return this.prismaService.user.update({
			where: {
				id,
			},
			data: updateEmployee,
		})
	}

	async delete(id: number) {
		return this.prismaService.user.delete({
			where: {
				id,
			}
		})
	}
}
