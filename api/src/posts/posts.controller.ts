import { GetUser } from '@/auth/decorators'
import { Body, Controller, Post } from '@nestjs/common'
import { CreatePostDto } from './dto'
import { PostsService } from './posts.service'

@Controller('posts')
export class PostsController {
	constructor(private readonly postsService: PostsService) {}

	@Post()
	create(
		@Body() createPostDto: CreatePostDto,
		@GetUser('id') userId: string
	) {
		return this.postsService.create(createPostDto, userId)
	}
}
