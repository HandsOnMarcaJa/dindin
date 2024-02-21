import { Injectable } from '@nestjs/common';
import { PassportStrategy } from '@nestjs/passport';
import { ExtractJwt, Strategy } from 'passport-jwt';
import { z } from 'zod';

export const tokenPayloadSchema = z.object({
  sub: z.string().refine((value) => /^[0-9a-fA-F]{24}$/.test(value)),
  email: z.string().email(),
});

export type TokenPayloadSchema = z.infer<typeof tokenPayloadSchema>;

@Injectable()
export class JwtStrategy extends PassportStrategy(Strategy) {
  constructor() {
    super({
      jwtFromRequest: ExtractJwt.fromAuthHeaderAsBearerToken(),
      secretOrKey: process.env.JWT_SECRET,
    });
  }

  async validate(payload: TokenPayloadSchema) {
    return tokenPayloadSchema.parse(payload);
  }
}
