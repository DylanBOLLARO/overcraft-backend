import { IsNotEmpty } from 'class-validator'

export class CreateFavoriteDto {
    @IsNotEmpty()
    readonly buildId: string

    @IsNotEmpty()
    readonly userId: string
}
