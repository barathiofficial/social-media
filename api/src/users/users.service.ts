import { ConflictException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { MailService } from 'src/mail/mail.service'
import { CreateOtpDto } from 'src/otp/dto'
import { OtpService } from 'src/otp/otp.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(
		private readonly db: DatabaseService,
		private readonly otpService: OtpService,
		private readonly mailService: MailService
	) {}

	async create(data: CreateUserDto) {
		const user = await this.findUnique(data.email)

		if (user) {
			throw new ConflictException('Email already exist')
		}

		const newUser = await this.db.user.create({ data })
		const otp = this.otpService.generateOtp()
		const userId = newUser.id
		const createOtpDto: CreateOtpDto = { otp, userId }

		await this.otpService.create(createOtpDto)

		this.mailService.sendOtp(data.email, otp)

		return newUser
	}

	findUnique(email: string) {
		return this.db.user.findUnique({
			where: { email }
		})
	}
}
