import type { mailConfig } from '@/config'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import * as fs from 'fs/promises'
import Handlebars from 'handlebars'
import * as nodemailer from 'nodemailer'
import type Mail from 'nodemailer/lib/mailer'
import * as path from 'path'

type SendOtpContext = {
	otp: string
	otpValidityMinutes: number
}

@Injectable()
export class MailService {
	constructor(
		private readonly configService: ConfigService<{
			mail: typeof mailConfig
		}>
	) {}

	async sendOtp(to: string, otp: string) {
		const context: SendOtpContext = {
			otp,
			otpValidityMinutes: 15
		}

		const html = await this.getMailContent<SendOtpContext>('otp', context)

		const mailOptions = {
			html,
			subject: 'OTP - ' + otp
		}

		this.sendMail(to, mailOptions)
	}

	private async getMailContent<C>(filename: string, context: C) {
		const file = path.join(__dirname, 'templates', filename + '.hbs')
		const templateFile = await fs.readFile(file, 'utf8')
		const template = Handlebars.compile<C>(templateFile)
		const html = template(context)

		return html
	}

	private sendMail(to: string, options: Mail.Options) {
		const transport = this.configService.get('mail')
		const user = this.configService.get<string>('mail.auth.user', {
			infer: true
		})
		const defaults = {
			from: `"Social Media" <${user}>`
		}

		const transporter = nodemailer.createTransport(transport, defaults)

		transporter
			.sendMail({ to, ...options })
			.then(() => {})
			.catch(() => {})
	}
}
