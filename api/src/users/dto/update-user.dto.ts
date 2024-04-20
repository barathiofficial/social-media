import { PartialType } from '@nestjs/mapped-types'
import { IsNotEmpty, IsString, Length } from 'class-validator'

class UpdateUser {
	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	@Length(1, 30, {
		message: 'Name length must be between 1 and 30 characters'
	})
	name: string
}

export class UpdateUserDto extends PartialType(UpdateUser) {}
