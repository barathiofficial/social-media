import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { CreateUserDto } from './dto/create-user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly db: DatabaseService) {}

	create(data: CreateUserDto) {
		return this.db.user.create({ data })
	}

	findUnique(email: string) {
		return this.db.user.findUnique({
			where: { email }
		})
	}
}
