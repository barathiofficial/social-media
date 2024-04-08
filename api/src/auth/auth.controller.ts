import { Controller, Post } from '@nestjs/common'
import { AuthService } from './auth.service'
import { AuthenticateDto, VerifyDto } from './dto'

@Controller('auth')
export class AuthController {
	constructor(private readonly authService: AuthService) {}

	@Post('authenticate')
	authenticate(data: AuthenticateDto) {
		return this.authService.authenticate(data)
	}

	@Post('verify')
	verify(data: VerifyDto) {
		return this.authService.verify(data)
	}
}
