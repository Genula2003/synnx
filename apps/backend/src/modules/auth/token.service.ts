import { TokenRepository } from './token.repository';
import { UserRepository } from '../users/user.repository';
import { ThemeRepository } from '../themes/theme.repository';
import { verifyRefreshToken, generateAccessToken, generateRefreshToken } from './auth.utils';
import { AppError } from '../../middleware/errorHandler';

const tokenRepository = new TokenRepository();
const userRepository = new UserRepository();
const themeRepository = new ThemeRepository();

export class TokenService {
  async refresh(token: string) {
    if (!token) {
      throw new AppError('Unauthorized: Refresh token missing', 401);
    }

    const savedToken = await tokenRepository.findRefreshToken(token);
    if (!savedToken) {
      throw new AppError('Unauthorized: Invalid refresh token', 401);
    }

    if (new Date() > savedToken.expiresAt) {
      await tokenRepository.deleteRefreshToken(token);
      throw new AppError('Unauthorized: Refresh token expired', 401);
    }

    try {
      const decoded = verifyRefreshToken(token);

      // Rotate refresh token
      await tokenRepository.deleteRefreshToken(token);

      const newAccessToken = generateAccessToken({ userId: decoded.userId });
      const newRefreshToken = generateRefreshToken({ userId: decoded.userId });

      const expiresAt = new Date();
      expiresAt.setDate(expiresAt.getDate() + 7);
      await tokenRepository.saveRefreshToken(decoded.userId, newRefreshToken, expiresAt);

      const user = await userRepository.findById(decoded.userId);
      const themePreference = await themeRepository.getThemePreference(decoded.userId);

      if (!user) {
        throw new AppError('Unauthorized: User not found', 401);
      }

      return {
        user: {
          id: user.id,
          username: user.username,
          email: user.email,
          avatar: user.avatar,
          banner: user.banner,
          bio: user.bio,
          status: user.status,
          createdAt: user.createdAt,
          updatedAt: user.updatedAt,
        },
        accessToken: newAccessToken,
        refreshToken: newRefreshToken,
        themePreference,
      };
    } catch (error) {
      throw new AppError('Unauthorized: Token validation failed', 401);
    }
  }

  async logout(token: string) {
    if (token) {
      await tokenRepository.deleteRefreshToken(token);
    }
  }
}
export class UserService {
  async getProfile(userId: string) {
    const user = await userRepository.findById(userId);
    if (!user) {
      throw new AppError('User not found', 404);
    }

    const themePreference = await themeRepository.getThemePreference(userId);

    return {
      user: {
        id: user.id,
        username: user.username,
        email: user.email,
        avatar: user.avatar,
        banner: user.banner,
        bio: user.bio,
        status: user.status,
        createdAt: user.createdAt,
        updatedAt: user.updatedAt,
      },
      themePreference,
    };
  }

  async updateTheme(userId: string, input: any) {
    const themePreference = await themeRepository.updateThemePreference(userId, input);
    return themePreference;
  }

  async updateStatus(userId: string, status: string) {
    const user = await userRepository.updateStatus(userId, status);
    return user;
  }
}
