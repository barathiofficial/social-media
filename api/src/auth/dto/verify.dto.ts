import { IsEmail, IsNotEmpty, IsNumberString, IsString } from 'class-validator'

export class VerifyDto {
	@IsNotEmpty({ message: 'Email is required' })
	@IsString({ message: 'Email must be a string' })
	@IsEmail({}, { message: 'Invalid email' })
	email: string

	@IsNotEmpty({ message: 'OTP cannot be empty' })
	@IsNumberString({ no_symbols: true }, { message: 'Invalid OTP' })
	otp: string
}
