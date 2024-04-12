import { Controller, Get, UseGuards } from '@nestjs/common'
import { User } from '@prisma/client'
import { GetUser } from 'src/auth/decorators'
import { JwtGuard } from 'src/auth/guards'

@UseGuards(JwtGuard)
@Controller('users')
export class UsersController {
	@Get('me')
	findMe(@GetUser() user: User) {
		return user
	}
}

