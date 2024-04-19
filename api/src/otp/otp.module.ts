import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'
import { OtpService } from './otp.service'

@Module({
	imports: [DatabaseModule],
	providers: [OtpService],
	exports: [OtpService]
})
export class OtpModule {}
