import {
    ConflictException,
    HttpStatus,
    Injectable,
    Logger,
} from '@nestjs/common'
import { CreateStepDto } from './dto/create-step.dto'
import { UpdateStepDto } from './dto/update-step.dto'
import { PrismaService } from 'src/prisma/prisma.service'
import { MOVE, MovePositionStepDto } from './dto/move-position-step.dto'

@Injectable()
export class StepService {
    constructor(private readonly prismaService: PrismaService) {}

    should_up_position(move: MOVE): boolean {
        return move === MOVE.UP
    }

    async create(createStep: CreateStepDto) {
        const { buildId, position, timer, population } = createStep

        await this.prismaService.step.create({
            data: {
                ...createStep,
                buildId,
                position: +position,
                timer: +timer,
                population: +population,
            },
        })
    }

    async findAll(buildId: string) {
        return this.prismaService.step.findMany({
            where: {
                buildId,
            },
        })
    }

    async findOne(id: string) {
        return this.prismaService.step.findUniqueOrThrow({
            where: {
                id,
            },
        })
    }

    async update(id: string, updateStep: UpdateStepDto) {
        const { buildId, position, timer, population } = updateStep
        await this.prismaService.step.update({
            where: {
                id,
            },
            data: {
                ...updateStep,
                buildId,
                position: +position,
                timer: +timer,
                population: +population,
            },
        })
    }

    async movePosition(movePositionStep: MovePositionStepDto) {
        const { id, buildId, move } = movePositionStep

        try {
            const init_step = await this.prismaService.step.findFirstOrThrow({
                where: {
                    buildId,
                    id,
                },
                select: {
                    id: true,
                    position: true,
                },
                take: 1,
            })

            const move_step = await this.prismaService.step.findFirst({
                where: {
                    buildId,
                    position: this.should_up_position(move)
                        ? { gt: +init_step.position }
                        : { lt: +init_step.position },
                },
                orderBy: this.should_up_position(move)
                    ? { position: 'asc' }
                    : { position: 'desc' },
                select: {
                    id: true,
                    position: true,
                },
                take: 1,
            })

            if (!move_step) {
                throw new ConflictException({
                    statusCode: HttpStatus.BAD_REQUEST,
                    message: 'Unable to obtain the next position',
                })
            }

            await this.prismaService.step.update({
                where: {
                    id: move_step.id,
                    position: +move_step.position,
                },
                data: { position: -1 },
            })

            await this.prismaService.step.update({
                where: {
                    id: init_step.id,
                    position: +init_step.position,
                },
                data: { position: move_step.position },
            })

            await this.prismaService.step.update({
                where: {
                    id: move_step.id,
                    position: -1,
                },
                data: { position: +init_step.position },
            })
        } catch (error) {
            Logger.error(error)
        } finally {
            await this.prismaService.$disconnect()
        }
    }

    async delete(id: string) {
        return this.prismaService.step.delete({
            where: {
                id,
            },
        })
    }
}
