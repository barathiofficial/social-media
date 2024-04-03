import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class CreateUserDto {
	@IsNotEmpty({ message: 'Email required' })
	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Invalid email' })
	email: string
}
