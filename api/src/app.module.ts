import { Module } from '@nestjs/common'
import { ConfigModule } from '@nestjs/config'
import { AuthModule } from './auth/auth.module'
import { dbConfig, jwtConfig, mailConfig } from './config'
import { DatabaseModule } from './database/database.module'
import { MailModule } from './mail/mail.module'
import { PostsModule } from './posts/posts.module'
import { UsersModule } from './users/users.module'
import { FilesModule } from './files/files.module'

@Module({
	imports: [
		ConfigModule.forRoot({
			load: [mailConfig, dbConfig, jwtConfig]
		}),
		UsersModule,
		DatabaseModule,
		MailModule,
		AuthModule,
		PostsModule,
		FilesModule
	]
})
export class AppModule {}
