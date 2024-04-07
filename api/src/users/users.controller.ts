import {
	Body,
	ConflictException,
	Controller,
	Post,
	ValidationPipe
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { MailService } from 'src/mail/mail.service'
import { CreateOtpDto } from 'src/otp/dto'
import { OtpService } from 'src/otp/otp.service'
import { CreateUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly otpService: OtpService,
		private readonly mailService: MailService
	) {}

	@Post()
	async create(@Body(ValidationPipe) data: CreateUserDto) {
		try {
			const user = await this.usersService.create(data)
			const otp = this.otpService.generateOtp()
			const createOtpDto: CreateOtpDto = { otp, userId: user.id }

			await this.otpService.create(createOtpDto)

			this.mailService.sendOtp(data.email, otp)

			return user
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException('Email already exist')
				}
			}

			throw new Error(error)
		}
	}
}
