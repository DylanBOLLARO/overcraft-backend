import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
} from '@nestjs/common'
import { StepService } from './step.service'
import { CreateStepDto } from './dto/create-step.dto'
import { MovePositionStepDto } from './dto/move-position-step.dto'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'

@UseGuards(AuthenticatedGuard)
@Controller('step')
export class StepController {
    constructor(private readonly stepService: StepService) {}

    @Post()
    async create(@Body() createStep: CreateStepDto) {
        return await this.stepService.create(createStep)
    }

    @Get(':id')
    async findOne(@Param('id') id: string) {
        return await this.stepService.findOne(id)
    }

    @Patch('move-position')
    async movePosition(@Body() movePositionStep: MovePositionStepDto) {
        return await this.stepService.movePosition(movePositionStep)
    }

    @Patch(':id')
    async update(@Param('id') id: string, @Body() updateTestyDto: any) {
        return await this.stepService.update(id, updateTestyDto)
    }

    @Delete(':id')
    async delete(@Param('id') id: string) {
        return await this.stepService.delete(id)
    }
}
