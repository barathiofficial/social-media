import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { MailModule } from 'src/mail/mail.module'
import { OtpModule } from 'src/otp/otp.module'
import { UsersController } from './users.controller'
import { UsersService } from './users.service'

@Module({
	imports: [DatabaseModule, OtpModule, MailModule],
	controllers: [UsersController],
	providers: [UsersService]
})
export class UsersModule {}
