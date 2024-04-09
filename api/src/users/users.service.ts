import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { CreateUserDto, UpdateUserDto } from './dto'

@Injectable()
export class UsersService {
	constructor(private readonly db: DatabaseService) {}

	create(data: CreateUserDto) {
		return this.db.user.create({ data })
	}

	update(data: UpdateUserDto, id: string) {
		return this.db.user.update({
			data,
			where: { id }
		})
	}

	findUnique(email: string) {
		return this.db.user.findUnique({
			where: { email }
		})
	}
}
