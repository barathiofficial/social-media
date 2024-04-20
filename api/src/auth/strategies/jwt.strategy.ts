import type { jwtConfig } from '@/config'
import { UsersService } from '@/users/users.service'
import { Injectable } from '@nestjs/common'
import { ConfigService } from '@nestjs/config'
import { PassportStrategy } from '@nestjs/passport'
import { ExtractJwt, Strategy } from 'passport-jwt'

type JwtPayload = {
	sub: string
	exp: number
	iat: number
}

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy, 'jwt') {
	constructor(
		readonly configService: ConfigService<{ jwt: typeof jwtConfig }>,
		private readonly usersService: UsersService
	) {
		super({
			jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
			ignoreExpiration: false,
			secretOrKey: configService.get<string>('jwt.secret', {
				infer: true
			})
		})
	}

	validate(payload: JwtPayload) {
		return this.usersService.findOne(payload.sub)
	}
}
