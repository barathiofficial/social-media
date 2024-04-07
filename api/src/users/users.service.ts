import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { MailService } from 'src/mail/mail.service'
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
		const user = await this.db.user.create({ data })
		const { otp } = await this.otpService.create(user.id)

		this.mailService.sendOtp(user.email, otp)

		return user
	}

	findUnique(email: string) {
		return this.db.user.findUnique({
			where: { email }
		})
	}
}
