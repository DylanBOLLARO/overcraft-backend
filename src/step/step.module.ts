import { Module } from '@nestjs/common'
import { StepService } from './step.service'
import { StepController } from './step.controller'
import { PrismaModule } from 'src/prisma/prisma.module'
import { PrismaService } from 'src/prisma/prisma.service'

@Module({
    controllers: [StepController],
    providers: [StepService, PrismaService],
})
export class StepModule {}
