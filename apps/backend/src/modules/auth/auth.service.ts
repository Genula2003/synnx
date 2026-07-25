import { UserRepository } from '../users/user.repository';
import { ThemeRepository } from '../themes/theme.repository';
import { TokenRepository } from './token.repository';
import { hashPassword, comparePassword, generateAccessToken, generateRefreshToken } from './auth.utils';
import { AppError } from '../../middleware/errorHandler';
import { registerSchema, loginSchema } from './auth.validation';

const userRepository = new UserRepository();
const themeRepository = new ThemeRepository();
const tokenRepository = new TokenRepository();

export class AuthService {
  async register(input: any) {
    const parsed = registerSchema.safeParse(input);
    if (!parsed.success) {
      throw new AppError(parsed.error.errors[0].message, 400);
    }

    const { username, email, password, avatar, banner, bio } = parsed.data;

    const existingEmail = await userRepository.findByEmail(email);
    if (existingEmail) {
      throw new AppError('Email already registered', 400);
    }

    const existingUsername = await userRepository.findByUsername(username);
    if (existingUsername) {
      throw new AppError('Username already taken', 400);
    }

    const passwordHash = await hashPassword(password);
    const user = await userRepository.create({
      username,
      email,
      passwordHash,
      avatar,
      banner,
      bio,
    });

    // Create default theme preference
    const themePreference = await themeRepository.createThemePreference(user.id, 'liquid-glass');

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await tokenRepository.saveRefreshToken(user.id, refreshToken, expiresAt);

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
      accessToken,
      refreshToken,
      themePreference,
    };
  }

  async login(input: any) {
    const parsed = loginSchema.safeParse(input);
    if (!parsed.success) {
      throw new AppError(parsed.error.errors[0].message, 400);
    }

    const { email, password } = parsed.data;

    const user = await userRepository.findByEmail(email);
    if (!user) {
      throw new AppError('Invalid email or password', 400);
    }

    const isMatch = await comparePassword(password, user.passwordHash);
    if (!isMatch) {
      throw new AppError('Invalid email or password', 400);
    }

    let themePreference = await themeRepository.getThemePreference(user.id);
    if (!themePreference) {
      themePreference = await themeRepository.createThemePreference(user.id, 'liquid-glass');
    }

    const accessToken = generateAccessToken({ userId: user.id });
    const refreshToken = generateRefreshToken({ userId: user.id });

    const expiresAt = new Date();
    expiresAt.setDate(expiresAt.getDate() + 7);
    await tokenRepository.saveRefreshToken(user.id, refreshToken, expiresAt);

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
      accessToken,
      refreshToken,
      themePreference,
    };
  }
}
