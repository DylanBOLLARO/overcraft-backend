import { Body, Controller, Post, Delete } from '@nestjs/common';
import { BuildOrderService } from './build-order.service';
import { NewBuild } from './dto/newBuild.dto';
import { GetAllBuild } from './dto/getAllBuild.dto';
import { DeleteBuild } from './dto/deleteBuild.dto';
import { AddLine } from './dto/addLine.dto';
import { GetAllLines } from './dto/getAllLines.dto';
import { SwapLine } from './dto/swapLine.dto';
import { DeleteLine } from './dto/deleteLine.dto';

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

    @Post('delete-build')
    deleteBuild(@Body() deleteBuildDto: DeleteBuild) {
        return this.buildOrderService.deleteBuild(deleteBuildDto);
    }

    @Post('add-line')
    addLine(@Body() addLineDto: AddLine) {
        return this.buildOrderService.addLine(addLineDto);
    }

    @Post('get-all-lines')
    getAllLines(@Body() getAllLinesDto: GetAllLines) {
        return this.buildOrderService.getAllLines(getAllLinesDto);
    }

    @Post('swap-line-up')
    swapLineUp(@Body() swapLineDto: SwapLine) {
        return this.buildOrderService.swapLineUp(swapLineDto);
    }

    @Post('swap-line-down')
    swapLineDown(@Body() swapLineDto: SwapLine) {
        return this.buildOrderService.swapLineDown(swapLineDto);
    }

    @Post('delete-line')
    deleteLine(@Body() deleteLineDto: DeleteLine) {
        return this.buildOrderService.deleteLine(deleteLineDto);
    }
}
