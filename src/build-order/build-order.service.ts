import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewBuild } from './dto/newBuild.dto';
import { GetAllBuild } from './dto/getAllBuild.dto';
import { DeleteBuild } from './dto/deleteBuild.dto';
import { AddLine } from './dto/addLine.dto';
import { GetAllLines } from './dto/getAllLines.dto';

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
}
