import { z } from 'zod';

export const promptSchema = z.object({
  title: z.string().min(1, 'Title is required'),
  content: z.string().min(1, 'Content is required'),
  tags: z.string().optional(),
});

export type PromptFormValues = z.infer<typeof promptSchema>;
