import {
	Body,
	ConflictException,
	Controller,
	Post,
	ValidationPipe
} from '@nestjs/common'
import { PrismaClientKnownRequestError } from '@prisma/client/runtime/library'
import { ActivateUserDto, CreateUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(private readonly usersService: UsersService) {}

	@Post()
	create(@Body(ValidationPipe) data: CreateUserDto) {
		try {
			return this.usersService.create(data)
		} catch (error) {
			if (error instanceof PrismaClientKnownRequestError) {
				if (error.code === 'P2002') {
					throw new ConflictException('Email already exist')
				}
			}

			throw new Error(error)
		}
	}

	@Post('activate')
	activate(@Body(ValidationPipe) data: ActivateUserDto) {
		return this.usersService.activate(data)
	}
}
