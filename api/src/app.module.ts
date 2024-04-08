import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { dbConfig, mailConfig } from './config'
import { DatabaseModule } from './database/database.module'
import { MailModule } from './mail/mail.module'
import { OtpModule } from './otp/otp.module'
import { UsersModule } from './users/users.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [mailConfig, dbConfig]
		}),
		UsersModule,
		DatabaseModule,
		OtpModule,
		MailModule,
		AuthModule
	]
})
export class AppModule {}
