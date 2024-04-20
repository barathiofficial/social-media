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

	updateOtp(id: string) {
		return this.db.user.update({
			data: {
				otp: this.generateOtp(),
				otpExpiry: new Date(Date.now() + 300000)
			},
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

	private generateOtp() {
		return Math.floor(Math.random() * 8999 + 1000).toString()
	}
}
