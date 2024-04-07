import { PartialType } from '@nestjs/mapped-types'
import { IsBoolean, IsNotEmpty, IsString, Length } from 'class-validator'

class UpdateUser {
	@IsBoolean({ message: 'Verification status must be a boolean' })
	verified: boolean

	@IsString({ message: 'Name must be a string' })
	@IsNotEmpty({ message: 'Name is required' })
	@Length(1, 30, {
		message: 'Name length must be between 1 and 30 characters'
	})
	fullname: string
}

export class UpdateUserDto extends PartialType(UpdateUser) {}
