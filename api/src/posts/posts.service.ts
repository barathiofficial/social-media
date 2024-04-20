import { DatabaseService } from '@/database/database.service'
import { Injectable } from '@nestjs/common'
import type { CreatePostDto } from './dto/create-post.dto'

@Injectable()
export class PostsService {
	constructor(private readonly db: DatabaseService) {}

	create(data: CreatePostDto, userId: string) {
		return this.db.post.create({
			data: {
				content: data.content,
				userId
			}
		})
	}
}
