import { IsString } from 'class-validator'

export class CreatePostDto {
	@IsString({ message: 'Content must be a string' })
	content: string
}
