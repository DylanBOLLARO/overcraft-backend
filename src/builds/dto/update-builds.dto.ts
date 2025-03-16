import { PartialType } from '@nestjs/mapped-types'
import { CreateBuildDto } from './create-builds.dto'

export class UpdateBuildDto extends PartialType(CreateBuildDto) {}
