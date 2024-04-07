import { IsEmail, IsInt, IsNotEmpty, IsString } from 'class-validator'

export class ActivateUserDto {
	@IsNotEmpty({ message: 'Email required' })
	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Invalid email' })
	email: string

	@IsNotEmpty({ message: 'OTP cannot be empty' })
	@IsInt({ message: 'OTP must be a number' })
	otp: number
}
