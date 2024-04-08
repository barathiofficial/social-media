import { Inject, Injectable } from '@nestjs/common'
import { ConfigType } from '@nestjs/config'
import { PrismaClient } from '@prisma/client'
import { DbConfig, databaseConfig } from 'src/config'

@Injectable()
export class DatabaseService extends PrismaClient {
	constructor(
		@Inject(databaseConfig.KEY)
		dbConfig: ConfigType<DbConfig['db']>
	) {
		super({
			datasources: {
				db: {
					url: dbConfig.dbUrl
				}
			}
		})
	}
}
