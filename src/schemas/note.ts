import { z } from 'zod';

export const UpdateParentSchema = z.object({
  parent_id: z.string().uuid(),
});

export type UpdateParentSchemaType = z.infer<typeof UpdateParentSchema>;
