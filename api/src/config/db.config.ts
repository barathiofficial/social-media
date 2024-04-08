import { registerAs } from '@nestjs/config'

export const dbConfig = registerAs('db', () => {
	return {
		dbUrl: process.env.DATABASE_URL
	}
})
