import { Injectable, NestMiddleware } from '@nestjs/common';
import { NextFunction, Request } from 'express';
import { z } from 'zod';

@Injectable()
export class ValidateIdMiddleware implements NestMiddleware {
  use (req: Request, res: Response, next: NextFunction) {
    const HexString12BytesSchema = z.string().refine(value => /^[0-9a-fA-F]{24}$/.test(value));
    const result = HexString12BytesSchema.safeParse(req.params.id);

    if (!result.success) {
      throw new Error('Invalid ID');
    }

    next();
  }
}
