import {
	Controller,
	Get,
	Post,
	Body,
	Patch,
	Param,
	Delete
} from "@nestjs/common";
import { StepService } from "./step.service";
import { CreateStepDto } from "./dto/create-step.dto";
import { MovePositionStepDto } from "./dto/move-position-step.dto";
import { Public } from "src/common/decorators";

@Controller("step")
export class StepController {
	constructor(private readonly stepService: StepService) {}

	@Post()
	create(@Body() createStep: CreateStepDto) {
		return this.stepService.create(createStep);
	}

	@Public()
	@Get(":id")
	find_all_by_build_id(@Param("id") build_id: string) {
		return this.stepService.findAll(+build_id);
	}

	@Patch("move-position")
	movePosition(@Body() movePositionStep: MovePositionStepDto) {
		return this.stepService.movePosition(movePositionStep);
	}

	@Delete(":id")
	delete(@Param("id") id: string) {
		return this.stepService.delete(+id);
	}
}
