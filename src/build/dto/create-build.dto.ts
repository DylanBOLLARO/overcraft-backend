import { Race } from "@prisma/client";
import { IsNotEmpty, IsNumberString } from "class-validator";

export class CreateBuildDto {
	@IsNotEmpty()
	readonly title: string;

	@IsNotEmpty()
	readonly description: string;

	@IsNotEmpty()
	readonly race: Race;

	@IsNotEmpty()
	readonly v_race: Race;

	@IsNotEmpty()
	readonly slug: string;

	@IsNotEmpty()
	@IsNumberString()
	readonly userId: string;
}
