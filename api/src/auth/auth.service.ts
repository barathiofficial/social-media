import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { MailService } from 'src/mail/mail.service'
import { OtpService } from 'src/otp/otp.service'
import { UsersService } from 'src/users/users.service'
import { AuthenticateDto, VerifyDto } from './dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly otpService: OtpService,
		private readonly mailService: MailService
	) {}

	async authenticate(data: AuthenticateDto) {
		let user = await this.usersService.findUnique(data.email)

		if (!user) {
			user = await this.usersService.create(data)
		}

		const { otp } = await this.otpService.create(user.id)

		this.mailService.sendOtp(user.email, otp)

		return {
			message: 'OTP sent'
		}
	}

	async verify(data: VerifyDto) {
		let user = await this.usersService.findUnique(data.email)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		const otp = await this.otpService.findOtp(user.id, data.otp)

		if (!otp) {
			throw new BadRequestException('Invalid OTP')
		}

		if (!user.verified) {
			user = await this.usersService.update({ verified: true }, user.id)
		}
	}
}
