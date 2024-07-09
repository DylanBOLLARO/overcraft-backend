import {
	ConflictException,
	HttpStatus,
	Injectable,
	Logger
} from "@nestjs/common";
import { CreateStepDto } from "./dto/create-step.dto";
import { UpdateStepDto } from "./dto/update-step.dto";
import { PrismaService } from "src/prisma/prisma.service";
import { MOVE, MovePositionStepDto } from "./dto/move-position-step.dto";

@Injectable()
export class StepService {
	constructor(private readonly prismaService: PrismaService) {}

	should_up_position(move: MOVE): boolean {
		return move === MOVE.UP;
	}

	async create(createStep: CreateStepDto) {
		const { build_id, position, timer, population } = createStep;

		await this.prismaService.build_step.create({
			data: {
				...createStep,
				build_id: +build_id,
				position: +position,
				timer: +timer,
				population: +population
			}
		});
	}

	async findAll(build_id: number) {
		return this.prismaService.build_step.findMany({
			where: {
				build_id
			}
		});
	}

	async findOne(id: number) {
		return this.prismaService.build_step.findUniqueOrThrow({
			where: {
				id
			}
		});
	}

	async update(id: number, updateStep: UpdateStepDto) {
		const { build_id, position, timer, population } = updateStep;
		await this.prismaService.build_step.update({
			where: {
				id
			},
			data: {
				...updateStep,
				build_id: +build_id,
				position: +position,
				timer: +timer,
				population: +population
			}
		});
	}

	async movePosition(movePositionStep: MovePositionStepDto) {
		const { id, build_id, move } = movePositionStep;

		try {
			const init_step =
				await this.prismaService.build_step.findFirstOrThrow({
					where: {
						build_id: +build_id,
						id: +id
					},
					select: {
						id: true,
						position: true
					},
					take: 1
				});

			const move_step = await this.prismaService.build_step.findFirst({
				where: {
					build_id: +build_id,
					position: this.should_up_position(move)
						? { gt: +init_step.position }
						: { lt: +init_step.position }
				},
				orderBy: this.should_up_position(move)
					? { position: "asc" }
					: { position: "desc" },
				select: {
					id: true,
					position: true
				},
				take: 1
			});

			if (!move_step) {
				throw new ConflictException({
					statusCode: HttpStatus.BAD_REQUEST,
					message: "Unable to obtain the next position"
				});
			}

			await this.prismaService.build_step.update({
				where: {
					id: +move_step.id,
					position: +move_step.position
				},
				data: { position: -1 }
			});

			await this.prismaService.build_step.update({
				where: {
					id: +init_step.id,
					position: +init_step.position
				},
				data: { position: move_step.position }
			});

			await this.prismaService.build_step.update({
				where: {
					id: +move_step.id,
					position: -1
				},
				data: { position: +init_step.position }
			});
		} catch (error) {
			Logger.error(error);
		} finally {
			await this.prismaService.$disconnect();
		}
	}

	async delete(id: number) {
		return this.prismaService.build_step.delete({
			where: {
				id
			}
		});
	}
}
