import { z } from 'zod';

export const userSchema = z.object({
  name: z.string().min(2, 'Name must be at least 2 characters').max(50, 'Name must be less than 50 characters'),
  email: z.string().email('Invalid email address'),
  username: z.string()
    .min(3, 'Username must be at least 3 characters')
    .max(20, 'Username must be less than 20 characters')
    .regex(/^[a-zA-Z0-9_]+$/, 'Username can only contain letters, numbers, and underscores'),
  department: z.string().min(2, 'Department must be at least 2 characters').max(50, 'Department must be less than 50 characters'),
});

export type UserFormData = z.infer<typeof userSchema>;

export interface User extends UserFormData {
  id: number;
}

export interface ValidationError {
  path: string[];
  message: string;
}