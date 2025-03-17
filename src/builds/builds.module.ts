import { Module } from '@nestjs/common'
import { BuildsService } from './builds.service'
import { BuildController } from './builds.controller'
import { UserService } from 'src/user/user.service'
import { PrismaService } from 'src/prisma/prisma.service'
import { StepService } from 'src/step/step.service'

@Module({
    controllers: [BuildController],
    providers: [BuildsService, UserService, PrismaService, StepService],
})
export class BuildModule {}
