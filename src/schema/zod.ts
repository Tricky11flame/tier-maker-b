import { z } from 'zod';

export const userSchema = z.object({
  email: z.string().email()
});

export const boardSchema = z.object({
  name: z.string().min(1),
  color: z.string(),
  columnOrder: z.array(z.string()).optional(),
  userId: z.string().uuid()
});

export const columnSchema = z.object({
  title: z.string().min(1),
  color: z.string().optional(),
  boardId: z.string().uuid(),
  taskOrder: z.array(z.string()).optional()
});

export const taskSchema = z.object({
  content: z.string().min(1),
  columnId: z.string().uuid()
});