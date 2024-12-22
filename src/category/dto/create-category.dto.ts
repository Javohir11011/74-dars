import { createZodDto } from 'nestjs-zod';
import { z } from 'zod';
export const CategorySchema = z.object({
  name: z.string().optional(),
  email: z.string().email(),
  description: z.string(),
  create_at: z.date(),
  update_at: z.date(),
});

export class CreateCategoryDto extends createZodDto(CategorySchema) {}
