import { IsEmail, IsNotEmpty, IsString } from 'class-validator'

export class AuthenticateDto {
	@IsNotEmpty({ message: 'Email is required' })
	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Invalid email' })
	email: string
}
