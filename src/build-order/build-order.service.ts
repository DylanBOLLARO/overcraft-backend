import { ConflictException, Injectable } from '@nestjs/common';
import { PrismaService } from 'src/prisma/prisma.service';
import { NewBuild } from './dto/newBuild.dto';
import { GetAllBuild } from './dto/getAllBuild.dto';

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

        return buildNameDto;
    }

    async getAllBuild(getAllBuildDto: GetAllBuild) {
        const { id } = getAllBuildDto;

        const buildNames = await this.prismaService.buildName.findMany({
            where: {
                User_id: parseInt(id)
            }
        });

        return buildNames;
    }
}
