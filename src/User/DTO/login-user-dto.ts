import { ZodValidationPipe } from 'src/shared/pipes/ZodValidationPipe';
import { z } from 'zod';

const loginUserBodySchema = z.object({
  email: z.string().email(),
  password: z.string().min(8).max(255),
});

export type LoginUserBodyDTO = z.infer<typeof loginUserBodySchema>;
export const loginUserBodyValidation = new ZodValidationPipe(
  loginUserBodySchema,
);
