import { ZodValidationPipe } from 'src/shared/pipes/ZodValidationPipe';
import { z } from 'zod';
import { createUserBodySchema } from './create-user.dto';

export const updateUserBody = createUserBodySchema.partial();

export type UpdateUserBodyDTO = z.infer<typeof updateUserBody>;
export const updateUserBodyPipeValidator = new ZodValidationPipe(
  updateUserBody,
);
