import { ZodValidationPipe } from 'src/shared/pipes/ZodValidationPipe';
import { z } from 'zod';

export const createUserBodySchema = z.object({
  name: z.string().trim().min(2).max(255),
  email: z.string().email(),
  password: z.string().trim().min(8).max(255),
});

export type CreateUserBodyDTO = z.infer<typeof createUserBodySchema>;
export const createUserBodyPipeValidator = new ZodValidationPipe(
  createUserBodySchema,
);
