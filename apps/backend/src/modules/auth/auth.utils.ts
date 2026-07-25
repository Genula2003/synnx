import bcrypt from 'bcrypt';
import jwt, { SignOptions } from 'jsonwebtoken';
import { config } from '../../config';

export async function hashPassword(password: string): Promise<string> {
  return bcrypt.hash(password, 10);
}

export async function comparePassword(password: string, hash: string): Promise<boolean> {
  return bcrypt.compare(password, hash);
}

export function generateAccessToken(payload: { userId: string }): string {
  const options: SignOptions = { expiresIn: config.accessTokenExpiresIn as any };
  return jwt.sign(payload, config.jwtSecret, options);
}

export function generateRefreshToken(payload: { userId: string }): string {
  const options: SignOptions = { expiresIn: config.refreshTokenExpiresIn as any };
  return jwt.sign(payload, config.jwtRefreshSecret, options);
}

export function verifyAccessToken(token: string): { userId: string } {
  return jwt.verify(token, config.jwtSecret) as { userId: string };
}

export function verifyRefreshToken(token: string): { userId: string } {
  return jwt.verify(token, config.jwtRefreshSecret) as { userId: string };
}
