import { registerAs } from '@nestjs/config'

const config = {
	host: process.env.MAIL_HOST,
	port: parseInt(process.env.MAIL_PORT || '0', 10),
	service: process.env.MAIL_SERVICE,
	secure: JSON.parse(process.env.MAIL_SECURE?.toLowerCase() || 'false'),
	auth: {
		user: process.env.MAIL_USER,
		pass: process.env.MAIL_PASS
	}
}

export const mailConfig = registerAs('mail', () => config)

export type MailConfig = {
	mail: typeof mailConfig
}
