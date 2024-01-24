import { z } from 'zod';

export const LoginSchema = z.object({
  username: z
    .string({ invalid_type_error: 'Username is required' })
    .min(1, { message: 'Username is required!' }),
  password: z
    .string({ invalid_type_error: 'Password is required' })
    .min(1, { message: 'Password is required!' }),
});

export type LoginSchemaType = z.infer<typeof LoginSchema>;
