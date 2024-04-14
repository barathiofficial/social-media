import { Module } from '@nestjs/common'
import { ConfigModule, ConfigService } from '@nestjs/config'
import { JwtModule } from '@nestjs/jwt'
import type { jwtConfig } from 'src/config'
import { MailModule } from 'src/mail/mail.module'
import { OtpModule } from 'src/otp/otp.module'
import { UsersModule } from 'src/users/users.module'
import { AuthController } from './auth.controller'
import { AuthService } from './auth.service'
import { JwtStrategy } from './strategies'

@Module({
	imports: [
		UsersModule,
		OtpModule,
		MailModule,
		ConfigModule,
		JwtModule.registerAsync({
			imports: [ConfigModule],
			inject: [ConfigService],
			useFactory: async (
				configService: ConfigService<{ jwt: typeof jwtConfig }>
			) => ({
				secret: configService.get<string>('jwt.secret', {
					infer: true
				}),
				signOptions: {
					expiresIn: configService.get<string>('jwt.expiresIn', {
						infer: true
					}),
					algorithm: 'HS256'
				}
			})
		})
	],
	controllers: [AuthController],
	providers: [AuthService, JwtStrategy]
})
export class AuthModule {}
