import { IsInt, IsNotEmpty, IsNumber, IsString } from 'class-validator'

export class CreateOtpDto {
	@IsNotEmpty({ message: 'OTP required' })
	@IsNumber(
		{ allowInfinity: false, allowNaN: false, maxDecimalPlaces: 0 },
		{ message: 'OTP must be a number' }
	)
	@IsInt({ message: 'OTP must be an integer' })
	otp: number

	@IsNotEmpty({ message: 'userId required' })
	@IsString({ message: 'userId must be a string' })
	userId: string
}
