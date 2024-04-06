import { Injectable } from '@nestjs/common'
import * as fs from 'fs/promises'
import Handlebars from 'handlebars'
import Mail from 'nodemailer/lib/mailer'
import * as path from 'path'
import { transporter } from './mail.config'

type SendOtpContext = {
	username: string
	otp: number
	otpValidityMinutes: number
}

@Injectable()
export class MailService {
	async sendOtp(to: string, otp: number) {
		const html = await this.getMailContent<SendOtpContext>('otp', {
			otp,
			otpValidityMinutes: 15,
			username: to
		})

		this.sendMail(to, {
			html,
			subject: 'OTP - ' + otp
		})
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
			.sendMail({
				from: '"Social Media" <barathiofficial@gmail.com>',
				to,
				...options
			})
			.then((res) => {
				console.log(res)
			})
			.catch((err) => {
				console.log(err)
			})
	}
}
