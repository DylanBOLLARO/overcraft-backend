import {
	PipeTransform,
	Injectable,
	ArgumentMetadata,
	ParseIntPipe,
	BadRequestException
} from "@nestjs/common";

@Injectable()
export class ValidationPipe implements PipeTransform {
	async transform(value: any, metadata: ArgumentMetadata) {
		if (metadata.type === "body") {
			const parseIntPipe = new ParseIntPipe();
			try {
				if (value.user_id !== undefined) {
					value.user_id = await parseIntPipe.transform(
						value.user_id,
						metadata
					);
				}
				if (value.build_id !== undefined) {
					value.build_id = await parseIntPipe.transform(
						value.build_id,
						metadata
					);
				}
			} catch (error) {
				console.error(error);
				throw new BadRequestException("Validation failed");
			}
		}
		return value;
	}
}
