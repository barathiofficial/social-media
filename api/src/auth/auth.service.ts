import { MailService } from '@/mail/mail.service'
import { UsersService } from '@/users/users.service'
import {
	BadRequestException,
	Injectable,
	NotFoundException
} from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { AuthenticateDto, VerifyDto } from './dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly mailService: MailService,
		private readonly jwtService: JwtService
	) {}

	async authenticate(data: AuthenticateDto) {
		let user = await this.usersService.findUnique(data.email)

		if (!user) {
			user = await this.usersService.create(data)
		}

		user = await this.usersService.updateOtp(user.id)

		this.mailService.sendOtp(user.email, user.otp || '')

		return {
			message: 'OTP sent'
		}
	}

	async verify(data: VerifyDto) {
		const user = await this.usersService.findUnique(data.email)

		if (!user) {
			throw new NotFoundException('User not found')
		}

		if (user.otpExpiry! < new Date()) {
			throw new BadRequestException('OTP expired')
		}

		if (user.otp !== data.otp) {
			throw new BadRequestException('Invalid OTP')
		}

		const payload = { sub: user.id }
		const token = await this.jwtService.signAsync(payload)

		return { token }
	}
}
