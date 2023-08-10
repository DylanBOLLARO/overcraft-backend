import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewBuild } from './dto/newBuild.dto';
import { GetAllBuild } from './dto/getAllBuild.dto';
import { DeleteBuild } from './dto/deleteBuild.dto';
import { AddLine } from './dto/addLine.dto';
import { GetAllLines } from './dto/getAllLines.dto';
import { SwapLine } from './dto/swapLine.dto';
import { DeleteLine } from './dto/deleteLine.dto';

@Injectable()
export class BuildOrderService {
    constructor(private readonly prismaService: PrismaService) {}
    async newBuild(buildNameDto: NewBuild) {
        const { title, desc, playrace, versusrace, User_id } = buildNameDto;

        const user = await this.prismaService.buildName.findFirst({
            where: { title }
        });

        if (user) throw new ConflictException('Build name already exists');

        await this.prismaService.buildName.create({
            data: {
                title,
                desc,
                playrace: parseInt(playrace),
                versusrace: parseInt(versusrace),
                User_id: parseInt(User_id)
            }
        });

        await this.prismaService.$disconnect();

        return buildNameDto;
    }

    async getAllBuild(getAllBuildDto: GetAllBuild) {
        const { id } = getAllBuildDto;

        const buildNames = await this.prismaService.buildName.findMany({
            where: {
                User_id: parseInt(id)
            }
        });

        await this.prismaService.$disconnect();

        return buildNames;
    }

    async deleteBuild(deleteBuildDto: DeleteBuild) {
        const { id } = deleteBuildDto;

        try {
            const deletedBuildName = await this.prismaService.buildName.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return deletedBuildName;
        } catch (error) {
            console.error('Error deleting BuildName:', error);
            throw error;
        } finally {
            await this.prismaService.$disconnect();
        }
    }

    async addLine(addLineDto: AddLine) {
        const { desc, population, timer, buildName_id } = addLineDto;

        console.log(addLineDto);

        await this.prismaService.buildStep.create({
            data: {
                desc,
                population: parseInt(population),
                timer: parseInt(timer),
                buildName_id: parseInt(buildName_id)
            }
        });
        await this.prismaService.$disconnect();
    }

    async getAllLines(getAllLinesDto: GetAllLines) {
        const { id } = getAllLinesDto;
        console.log(getAllLinesDto);

        const buildLines = await this.prismaService.buildStep.findMany({
            where: {
                buildName_id: parseInt(id)
            }
        });

        await this.prismaService.$disconnect();

        return buildLines;
    }

    async swapLineUp(swapLineDto: SwapLine) {
        const { table, id, buildId } = swapLineDto;

        const previousId = await this.prismaService.buildStep.findFirst({
            where: {
                id: {
                    lt: parseInt(id)
                },
                buildName_id: parseInt(buildId)
            },
            orderBy: {
                id: 'desc'
            }
        });

        try {
            await this.prismaService.$transaction(async (tx) => {
                const record1: number = await tx[table].findUnique({
                    where: { id: parseInt(id) }
                });

                const record2: number = await tx[table].findUnique({
                    where: { id: previousId.id }
                });

                if (!record1 || !record2) {
                    throw new Error("L'un des IDs n'existe pas dans la table.");
                }

                const tempId = -1;
                const tempId2 = -2;

                await tx[table].update({
                    where: { id: parseInt(id) },
                    data: { id: tempId }
                });

                await tx[table].update({
                    where: { id: previousId.id },
                    data: { id: tempId2 }
                });

                // 3. Interversion des valeurs d'ID
                await tx[table].update({
                    where: { id: tempId },
                    data: { id: previousId.id }
                });
                await tx[table].update({
                    where: { id: tempId2 },
                    data: { id: parseInt(id) }
                });
            });

            console.log('Les IDs ont été intervertis avec succès !');
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        } finally {
            await this.prismaService.$disconnect();
        }
    }

    async swapLineDown(swapLineDto: SwapLine) {
        const { table, id, buildId } = swapLineDto;

        const nextId = await this.prismaService.buildStep.findFirst({
            where: {
                id: {
                    gt: parseInt(id)
                },
                buildName_id: parseInt(buildId)
            },
            orderBy: {
                id: 'asc'
            }
        });

        try {
            await this.prismaService.$transaction(async (tx) => {
                const record1 = await tx[table].findUnique({
                    where: { id: parseInt(id) }
                });

                const record2 = await tx[table].findUnique({
                    where: { id: nextId.id }
                });

                if (!record1 || !record2) {
                    throw new Error("L'un des IDs n'existe pas dans la table.");
                }

                const tempId = -1;
                const tempId2 = -2;

                await tx[table].update({
                    where: { id: parseInt(id) },
                    data: { id: tempId }
                });

                await tx[table].update({
                    where: { id: nextId.id },
                    data: { id: tempId2 }
                });

                // 3. Interversion des valeurs d'ID
                await tx[table].update({
                    where: { id: tempId },
                    data: { id: nextId.id }
                });
                await tx[table].update({
                    where: { id: tempId2 },
                    data: { id: parseInt(id) }
                });
            });

            console.log('Les IDs ont été intervertis avec succès !');
        } catch (error) {
            console.error('Une erreur est survenue :', error);
        } finally {
            await this.prismaService.$disconnect();
        }
    }

    async deleteLine(deleteLineDto: DeleteLine) {
        const { id } = deleteLineDto;

        try {
            const deletedLine = await this.prismaService.buildStep.delete({
                where: {
                    id: parseInt(id)
                }
            });
            return deletedLine;
        } catch (error) {
            console.error('Error deleting BuildName:', error);
            throw error;
        } finally {
            await this.prismaService.$disconnect();
        }
    }
}
