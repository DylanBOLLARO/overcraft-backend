import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { StepService } from './step.service';
import { CreateStepDto } from './dto/create-step.dto';
import { UpdateStepDto } from './dto/update-step.dto';

@Controller('step')
export class StepController {
  constructor(private readonly stepService: StepService) {}

  @Post()
  create(@Body() createStepDto: CreateStepDto) {
    return this.stepService.create(createStepDto);
  }

  @Get()
  findAll() {
    return this.stepService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.stepService.findOne(+id);
  }

  @Patch('up/:id')
  swapLineUp(@Param('id') id: string) {
    return this.stepService.up(+id);
  }

  @Patch('down/:id')
  swapLineDown(@Param('id') id: string) {
    return this.stepService.down(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateStepDto: UpdateStepDto) {
    return this.stepService.update(+id, updateStepDto);
  }

  @Delete(':id')
  delete(@Param('id') id: string) {
    return this.stepService.delete(+id);
  }
}
