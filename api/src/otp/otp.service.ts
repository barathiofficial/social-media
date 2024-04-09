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

	update(userId: string) {
		const otp = this.generateOtp()
		return this.db.otp.update({
			data: { otp },
			where: { userId }
		})
	}

	findOtp(userId: string, otp: number) {
		return this.db.otp.findUnique({
			where: { userId, otp }
		})
	}

	findUnique(userId: string) {
		return this.db.otp.findUnique({
			where: { userId }
		})
	}

	private generateOtp() {
		return Math.floor(Math.random() * 8999 + 1000)
	}
}
