import type { ExecutionContext } from '@nestjs/common'
import { createParamDecorator } from '@nestjs/common'
import type { User } from '@prisma/client'

export const GetUser = createParamDecorator(
	(data: keyof User | undefined, ctx: ExecutionContext) => {
		const user = ctx.switchToHttp().getRequest().user as User

		if (data) {
			return user[data]
		}

		return user
	}
)
