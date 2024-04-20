import { DatabaseModule } from '@/database/database.module'
import { Module } from '@nestjs/common'
import { PostsController } from './posts.controller'
import { PostsService } from './posts.service'

@Module({
	imports: [DatabaseModule],
	providers: [PostsService],
	controllers: [PostsController]
})
export class PostsModule {}
