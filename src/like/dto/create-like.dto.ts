import { IsNotEmpty } from "class-validator";

export class CreateLikeDto {
	@IsNotEmpty()
	readonly user_id: number;

	@IsNotEmpty()
	readonly build_id: number;
}
