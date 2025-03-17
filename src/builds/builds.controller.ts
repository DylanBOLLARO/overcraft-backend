import {
    Controller,
    Get,
    Post,
    Body,
    Patch,
    Param,
    Delete,
    UseGuards,
    Query,
} from '@nestjs/common'
import { CreateBuildDto } from './dto/create-builds.dto'
import { UpdateBuildDto } from './dto/update-builds.dto'
import { AuthenticatedGuard } from 'src/common/guards/authenticated.guard'
import { GetCurrentUserId } from 'src/common/decorators'
import { BuildsService } from './builds.service'
import * as _ from 'lodash'

@Controller('builds')
export class BuildController {
    constructor(private readonly buildsService: BuildsService) {}

    @UseGuards(AuthenticatedGuard)
    @Post()
    create(@Body() createBuildDto: CreateBuildDto) {
        return this.buildsService.create(createBuildDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Post('import-build')
    importBuild(@Body() createBuildDto: CreateBuildDto) {
        return this.buildsService.importBuild(createBuildDto)
    }

    @Get()
    async findAll(@Query() params: any) {
        return await this.buildsService.findAll(params)
    }

    @Get(':buildId')
    async findOne(
        @GetCurrentUserId() userId: string,
        @Param('buildId') buildId: string
    ) {
        return await this.buildsService.findOne(userId, buildId)
    }

    @UseGuards(AuthenticatedGuard)
    @Patch(':id')
    update(@Param('id') id: string, @Body() updateBuildDto: UpdateBuildDto) {
        return this.buildsService.update(id, updateBuildDto)
    }

    @UseGuards(AuthenticatedGuard)
    @Delete(':id')
    remove(@Param('id') id: string) {
        return this.buildsService.remove(id)
    }
}
