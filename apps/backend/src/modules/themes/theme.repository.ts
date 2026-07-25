import { prisma } from '../../database';
import { ThemePreference } from '@prisma/client';

export class ThemeRepository {
  async getThemePreference(userId: string): Promise<ThemePreference | null> {
    return prisma.themePreference.findUnique({ where: { userId } });
  }

  async createThemePreference(userId: string, theme = 'liquid-glass'): Promise<ThemePreference> {
    return prisma.themePreference.create({
      data: {
        userId,
        theme,
        blur: 20,
        transparency: 15,
        shadow: 30,
        radius: 16,
        animationSpeed: 5,
      },
    });
  }

  async updateThemePreference(
    userId: string,
    data: Partial<Omit<ThemePreference, 'id' | 'userId'>>
  ): Promise<ThemePreference> {
    return prisma.themePreference.upsert({
      where: { userId },
      update: data,
      create: {
        userId,
        theme: data.theme || 'liquid-glass',
        blur: data.blur ?? 20,
        transparency: data.transparency ?? 15,
        shadow: data.shadow ?? 30,
        radius: data.radius ?? 16,
        animationSpeed: data.animationSpeed ?? 5,
      },
    });
  }
}
