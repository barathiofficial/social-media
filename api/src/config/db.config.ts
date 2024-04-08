import { registerAs } from '@nestjs/config'

const config = {
	dbUrl: process.env.DATABASE_URL
}

export const databaseConfig = registerAs('db', () => config)

export type DbConfig = {
	db: typeof databaseConfig
}
