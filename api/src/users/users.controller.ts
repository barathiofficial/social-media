import { Body, Controller, Post, ValidationPipe } from '@nestjs/common'
import { CreateUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body(ValidationPipe) data: CreateUserDto) {
		return this.usersService.create(data)
	}
}
