import { prisma } from '../../database';
import { User, ThemePreference } from '@prisma/client';

export class UserRepository {
  async findByEmail(email: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { email } });
  }

  async findByUsername(username: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { username } });
  }

  async findById(id: string): Promise<User | null> {
    return prisma.user.findUnique({ where: { id } });
  }

  async create(data: {
    username: string;
    email: string;
    passwordHash: string;
    avatar?: string | null;
    banner?: string | null;
    bio?: string | null;
  }): Promise<User> {
    return prisma.user.create({
      data: {
        username: data.username,
        email: data.email,
        passwordHash: data.passwordHash,
        avatar: data.avatar || null,
        banner: data.banner || null,
        bio: data.bio || null,
        status: 'ONLINE',
      },
    });
  }

  async updateStatus(id: string, status: string): Promise<User> {
    return prisma.user.update({
      where: { id },
      data: { status },
    });
  }
}
