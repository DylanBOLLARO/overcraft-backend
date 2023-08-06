import { Body, Controller, Post } from '@nestjs/common';
import { BuildOrderService } from './build-order.service';
import { NewBuild } from './dto/newBuild.dto';
import { GetAllBuild } from './dto/getAllBuild.dto';

@Controller('build-order')
export class BuildOrderController {
    constructor(private readonly buildOrderService: BuildOrderService) {}

    @Post('new-build')
    newBuild(@Body() newBuildDto: NewBuild) {
        return this.buildOrderService.newBuild(newBuildDto);
    }

    @Post('get-all-build')
    getAllBuild(@Body() getAllBuildDto: GetAllBuild) {
        return this.buildOrderService.getAllBuild(getAllBuildDto);
    }
}
