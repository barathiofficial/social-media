import { ConflictException, Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { CreateUserDto } from './dto/create-user.dto'
import { UpdateUserDto } from './dto/update-user.dto'

@Injectable()
export class UsersService {
	constructor(private readonly db: DatabaseService) {}

	async create(createUserDto: CreateUserDto) {
		const user = await this.findUnique(createUserDto.email)

		if (user) {
			throw new ConflictException('Email already exist')
		}

		return this.db.user.create({
			data: createUserDto
		})
	}

	findAll() {
		return `This action returns all users`
	}

	findOne(id: number) {
		return `This action returns a #${id} user`
	}

	findUnique(email: string) {
		return this.db.user.findUnique({
			where: {
				email
			}
		})
	}

	update(id: number, updateUserDto: UpdateUserDto) {
		return `This action updates a #${id} user`
	}

	remove(id: number) {
		return `This action removes a #${id} user`
	}
}
