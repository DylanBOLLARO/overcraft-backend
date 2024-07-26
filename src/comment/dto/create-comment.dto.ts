import { IsNotEmpty, IsString } from "class-validator";

export class CreateCommentDto {
	@IsNotEmpty()
	readonly user_id: number;

	@IsNotEmpty()
	readonly build_id: number;

	@IsNotEmpty()
	@IsString()
	readonly content: string;
}
