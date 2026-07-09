import { z } from 'zod';

export enum UserRole {
  ADMIN = 'ADMIN',
  SECURITY = 'SECURITY',
  OPERATIONS = 'OPERATIONS',
  SUSTAINABILITY = 'SUSTAINABILITY',
  LOGISTICS = 'LOGISTICS',
  MEDICAL = 'MEDICAL',
  ACCESSIBILITY = 'ACCESSIBILITY',
  ANALYST = 'ANALYST',
}

export interface Permission {
  id: string;
  name: string;
  description: string;
}

export interface User {
  id: string;
  email: string;
  firstName: string;
  lastName: string;
  role: UserRole;
  isActive: boolean;
  avatarUrl?: string;
  lastLogin?: string;
}

export interface JwtPayload {
  sub: string;
  email: string;
  role: UserRole;
  exp: number;
  iat: number;
}

export const LoginRequestSchema = z.object({
  email: z.string().email(),
  password: z.string().min(8),
});

export type LoginRequest = z.infer<typeof LoginRequestSchema>;

export interface LoginResponse {
  accessToken: string;
  refreshToken: string;
  user: User;
}

export const RefreshTokenRequestSchema = z.object({
  refreshToken: z.string(),
});

export type RefreshTokenRequest = z.infer<typeof RefreshTokenRequestSchema>;
