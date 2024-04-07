import { Injectable } from '@nestjs/common'
import { DatabaseService } from 'src/database/database.service'

@Injectable()
export class OtpService {
	constructor(private readonly db: DatabaseService) {}

	create(userId: string) {
		const otp = this.generateOtp()
		return this.db.otp.create({
			data: { otp, userId }
		})
	}

	findOtp(userId: string, otp: number) {
		return this.db.otp.findUnique({
			where: { userId, otp }
		})
	}

	private generateOtp() {
		return Math.floor(Math.random() * 1000 + 8999)
	}
}
