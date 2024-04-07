import { Injectable } from '@nestjs/common'
import * as fs from 'fs/promises'
import Handlebars from 'handlebars'
import Mail from 'nodemailer/lib/mailer'
import * as path from 'path'
import { transporter } from './mail.config'

type SendOtpContext = {
	otp: number
	otpValidityMinutes: number
}

@Injectable()
export class MailService {
	async sendOtp(to: string, otp: number) {
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
		transporter
			.sendMail({ to, ...options })
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}
}
