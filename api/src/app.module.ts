import { Module } from '@nestjs/common'
import { DatabaseModule } from './database/database.module'
import { OtpModule } from './otp/otp.module'
import { UsersModule } from './users/users.module'
import { MailModule } from './mail/mail.module';

@Module({
	imports: [UsersModule, DatabaseModule, OtpModule, MailModule]
})
export class AppModule {}
