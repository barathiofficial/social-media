import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { CreateOtpDto } from './dto/create-otp.dto'
import { UpdateOtpDto } from './dto/update-otp.dto'

@Injectable()
export class OtpService {
	constructor(private readonly db: DatabaseService) {}

	create(createOtpDto: CreateOtpDto) {
		return this.db.otp.create({
			data: createOtpDto
		})
	}

	findAll() {
		return `This action returns all otp`
	}

	findOne(id: number) {
		return `This action returns a #${id} otp`
	}

	update(id: number, updateOtpDto: UpdateOtpDto) {
		return `This action updates a #${id} otp`
	}

	remove(id: number) {
		return `This action removes a #${id} otp`
	}
}
