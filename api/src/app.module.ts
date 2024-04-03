import { Module } from '@nestjs/common'
import { AppController } from './app.controller'
import { AppService } from './app.service'
import { DatabaseModule } from './database/database.module'
import { UsersModule } from './users/users.module'
import { OtpModule } from './otp/otp.module';

@Module({
	imports: [UsersModule, DatabaseModule, OtpModule],
	controllers: [AppController],
	providers: [AppService],
})
export class AppModule {}
