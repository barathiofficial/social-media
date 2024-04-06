import { Module } from '@nestjs/common'
import { DatabaseModule } from 'src/database/database.module'
import { OtpService } from './otp.service'

@Module({
	imports: [DatabaseModule],
	providers: [OtpService],
	exports: [OtpService]
})
export class OtpModule {}
