import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import type { dbConfig } from 'src/config'

@Injectable()
export class DatabaseService extends PrismaClient {
	constructor(readonly configService: ConfigService<{ db: typeof dbConfig }>) {
		super({
			datasources: {
				db: {
					url: configService.get<string>('db.dbUrl', { infer: true })
				}
			}
		})
	}
}
