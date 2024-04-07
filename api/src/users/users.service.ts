import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { MailService } from 'src/mail/mail.service'
import { OtpService } from 'src/otp/otp.service'
import { ActivateUserDto, UpdateUserDto } from './dto'
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

	async activate(data: ActivateUserDto) {
		const user = await this.findUnique(data.email)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		const otp = await this.otpService.findOtp(user.id, data.otp)

		if (!otp) {
			throw new BadRequestException('Invalid OTP')
		}

		return this.update({ verified: true }, user.id)
	}

	update(data: UpdateUserDto, id: string) {
		return this.db.user.update({
			data,
			where: { id }
		})
	}

	findUnique(email: string) {
		return this.db.user.findUnique({
			where: { email }
		})
	}
}
