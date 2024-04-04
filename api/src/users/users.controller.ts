import {
	Body,
	Controller,
	Delete,
	Get,
	Param,
	Patch,
	Post,
	ValidationPipe
} from '@nestjs/common'
import { OtpService } from 'src/otp/otp.service'
import { CreateUserDto, UpdateUserDto } from './dto'
import { UsersService } from './users.service'

@Controller('users')
export class UsersController {
	constructor(
		private readonly usersService: UsersService,
		private readonly otpService: OtpService
	) {}

	@Post()
	create(@Body(ValidationPipe) createUserDto: CreateUserDto) {
		console.log({ createUserDto })

		this.otpService.create({})

		return this.usersService.create(createUserDto)
	}

	@Get()
	findAll() {
		return this.usersService.findAll()
	}

	@Get(':id')
	findOne(@Param('id') id: string) {
		return this.usersService.findOne(+id)
	}

	@Patch(':id')
	update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
		return this.usersService.update(+id, updateUserDto)
	}

	@Delete(':id')
	remove(@Param('id') id: string) {
		return this.usersService.remove(+id)
	}
}
