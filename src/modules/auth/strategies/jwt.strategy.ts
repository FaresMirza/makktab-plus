
import { ExtractJwt, Strategy } from 'passport-jwt';
import { PassportStrategy } from '@nestjs/passport';
import { Injectable } from '@nestjs/common';

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
    constructor() {
        super({
            jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
            ignoreExpiration: false,
            secretOrKey: process.env.JWT_SECRET || 'super-secret-key-change-this',
        });
    }

    /**
     * `sub` in the JWT payload is the user's publicId (UUID).
     */
    async validate(payload: any) {
        return { userId: payload.sub, username: payload.username, roles: payload.roles };
    }
}
