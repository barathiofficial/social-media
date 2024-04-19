import { DatabaseService } from '@/database/database.service'
import { Injectable } from '@nestjs/common'
import type { CreateUserDto, UpdateUserDto } from './dto'

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

	findOne(id: string) {
		return this.db.user.findUnique({
			where: { id }
		})
	}
}
