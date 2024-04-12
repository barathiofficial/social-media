import { BadRequestException, Injectable, NotFoundException } from '@nestjs/common'
import { JwtService } from '@nestjs/jwt'
import type { Otp } from '@prisma/client'
import { MailService } from 'src/mail/mail.service'
import { OtpService } from 'src/otp/otp.service'
import { UsersService } from 'src/users/users.service'
import type { AuthenticateDto, VerifyDto } from './dto'

@Injectable()
export class AuthService {
	constructor(
		private readonly usersService: UsersService,
		private readonly otpService: OtpService,
		private readonly mailService: MailService,
		private readonly jwtService: JwtService
	) {}

	async authenticate(data: AuthenticateDto) {
		let userOtp: Otp | null
		let user = await this.usersService.findUnique(data.email)

		if (!user) {
			user = await this.usersService.create(data)
			userOtp = await this.otpService.create(user.id)
		} else {
			userOtp = await this.otpService.findUnique(user.id)

			if (!userOtp) {
				userOtp = await this.otpService.create(user.id)
			} else {
				userOtp = await this.otpService.update(user.id)
			}
		}

		this.mailService.sendOtp(user.email, userOtp.otp)

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

		const payload = { sub: user.id, email: user.email }
		const access_token = await this.jwtService.signAsync(payload)

		return { access_token }
	}
}
