import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthenticateDto, VerifyDto } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('authenticate')
	authenticate(@Body(ValidationPipe) data: AuthenticateDto) {
		return this.authService.authenticate(data)
	}

	@Post('verify')
	verify(@Body(ValidationPipe) data: VerifyDto) {
		return this.authService.verify(data)
	}
}
