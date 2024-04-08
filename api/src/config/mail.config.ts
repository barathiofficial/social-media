import { registerAs } from '@nestjs/config'

export const mailConfig = registerAs('mail', () => {
	return {
		host: process.env.MAIL_HOST,
		port: parseInt(process.env.MAIL_PORT || '0', 10),
		service: process.env.MAIL_SERVICE,
		secure: JSON.parse(process.env.MAIL_SECURE?.toLowerCase() || 'false'),
		auth: {
			user: process.env.MAIL_USER,
			pass: process.env.MAIL_PASS
		}
	}
})
