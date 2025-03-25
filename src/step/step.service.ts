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
import * as _ from 'lodash'

@Injectable()
export class StepService {
    constructor(private readonly prismaService: PrismaService) {}

    should_up_position(move: MOVE): boolean {
        return move === MOVE.UP
    }

    async create(createStep: CreateStepDto) {
        const { buildId, position, timer, population } = createStep

        return await this.prismaService.step.create({
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
        await this.prismaService.step.update({
            where: {
                id,
            },
            data: updateStep,
        })
    }

    private readonly getIdExchange = async (data: any) => {
        try {
            const { position, move, buildId } = data
            if (position <= 0 && move === 'UP') return

            const maxPosition =
                (await this.prismaService.step.count({
                    where: {
                        buildId,
                    },
                })) - 1

            if (position >= maxPosition && move === 'DOWN') return

            let highestPosition = null
            let lowestPosition = null

            if (move == 'UP') {
                highestPosition = position - 1
                lowestPosition = position
            } else {
                highestPosition = position
                lowestPosition = position + 1
            }

            const task1 = await this.prismaService.step.findFirstOrThrow({
                where: {
                    buildId,
                    position: highestPosition,
                },
            })

            const task2 = await this.prismaService.step.findFirstOrThrow({
                where: {
                    buildId,
                    position: lowestPosition,
                },
            })

            await this.prismaService.$transaction([
                this.prismaService.step.update({
                    where: { id: task1.id },
                    data: { position: task2.position },
                }),
                this.prismaService.step.update({
                    where: { id: task2.id },
                    data: { position: task1.position },
                }),
            ])
        } catch (error) {
            console.error(error)
        } finally {
            await this.prismaService.$disconnect()
        }
    }

    async movePosition(movePositionStep: MovePositionStepDto) {
        const { id, buildId, move } = movePositionStep

        const { position } =
            (await this.prismaService.step.findUnique({
                where: {
                    id,
                },
            })) || {}

        if (_.isNil(position)) return

        await this.getIdExchange({ id, position, move, buildId })

        return
        function transfer() {
            return this.prismaService.$transaction(async (tx: any) => {
                // 1. Decrement amount from the sender.
                // const sender = await tx.account.update({
                //     data: {
                //         balance: {
                //             decrement: amount,
                //         },
                //     },
                //     where: {
                //         email: from,
                //     },
                // })
                // 2. Verify that the sender's balance didn't go below zero.
                // if (sender.balance < 0) {
                //     throw new Error(
                //         `${from} doesn't have enough to send ${amount}`
                //     )
                // }
                // 3. Increment the recipient's balance by amount
                // const recipient = await tx.account.update({
                //     data: {
                //         balance: {
                //             increment: amount,
                //         },
                //     },
                //     where: {
                //         email: to,
                //     },
                // })
                // return recipient
            })
        }

        transfer()
        return

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
