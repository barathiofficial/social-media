import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'
import { CreateOtpDto } from './dto/create-otp.dto'

@Injectable()
export class OtpService {
	constructor(private readonly db: DatabaseService) {}

	create(data: CreateOtpDto) {
		return this.db.otp.create({ data })
	}

	generateOtp() {
		return Math.floor(Math.random() * 1000 + 8999)
	}
}
