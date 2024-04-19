import { GetUser } from '@/auth/decorators'
import { JwtGuard } from '@/auth/guards'
import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
	@Get('me')
	findMe(@GetUser() user: User) {
		return user
	}
}
