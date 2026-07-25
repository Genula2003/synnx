import { z } from 'zod';

export const registerSchema = z.object({
  username: z.string().min(3, 'Username must be at least 3 characters').max(30),
  email: z.string().email('Invalid email address'),
  password: z.string().min(6, 'Password must be at least 6 characters'),
  avatar: z.string().url('Avatar must be a valid URL').optional().nullable(),
  banner: z.string().url('Banner must be a valid URL').optional().nullable(),
  bio: z.string().max(160).optional().nullable(),
});

export const loginSchema = z.object({
  email: z.string().email('Invalid email address'),
  password: z.string(),
});

export const themeUpdateSchema = z.object({
  theme: z.enum(['liquid-glass', 'cotton-candy', 'clay', 'midnight', 'neon-cyber']),
  blur: z.number().min(0).max(100),
  transparency: z.number().min(0).max(100),
  shadow: z.number().min(0).max(100),
  radius: z.number().min(0).max(100),
  animationSpeed: z.number().min(0).max(100),
});

export const statusUpdateSchema = z.object({
  status: z.enum(['ONLINE', 'IDLE', 'DND', 'OFFLINE']),
});
