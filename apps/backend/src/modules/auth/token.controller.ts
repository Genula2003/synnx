import { Request, Response, NextFunction } from 'express';
import { TokenService, UserService } from './token.service';
import { AuthenticatedRequest } from '../../middleware/authMiddleware';
import { themeUpdateSchema, statusUpdateSchema } from './auth.validation';
import { AppError } from '../../middleware/errorHandler';

const tokenService = new TokenService();
const userService = new UserService();

export class TokenController {
  async refresh(req: Request, res: Response, next: NextFunction) {
    try {
      // Look in body or HttpOnly cookies
      const token = req.body.refreshToken || req.cookies?.refreshToken;
      const data = await tokenService.refresh(token);

      res.cookie('refreshToken', data.refreshToken, {
        httpOnly: true,
        secure: process.env.NODE_ENV === 'production',
        sameSite: 'strict',
        maxAge: 7 * 24 * 60 * 60 * 1000,
      });

      res.status(200).json({
        success: true,
        message: 'Tokens refreshed successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async logout(req: Request, res: Response, next: NextFunction) {
    try {
      const token = req.body.refreshToken || req.cookies?.refreshToken;
      await tokenService.logout(token);

      res.clearCookie('refreshToken');
      res.status(200).json({
        success: true,
        message: 'Logged out successfully',
      });
    } catch (error) {
      next(error);
    }
  }
}

export class UserController {
  async getProfile(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const data = await userService.getProfile(userId);
      res.status(200).json({
        success: true,
        message: 'Profile retrieved successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateTheme(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const parsed = themeUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(parsed.error.errors[0].message, 400);
      }

      const data = await userService.updateTheme(userId, parsed.data);
      res.status(200).json({
        success: true,
        message: 'Theme preference updated successfully',
        data,
      });
    } catch (error) {
      next(error);
    }
  }

  async updateStatus(req: AuthenticatedRequest, res: Response, next: NextFunction) {
    try {
      const userId = req.user?.userId;
      if (!userId) {
        throw new AppError('Unauthorized', 401);
      }

      const parsed = statusUpdateSchema.safeParse(req.body);
      if (!parsed.success) {
        throw new AppError(parsed.error.errors[0].message, 400);
      }

      const data = await userService.updateStatus(userId, parsed.data.status);
      res.status(200).json({
        success: true,
        message: 'Status updated successfully',
        data: {
          id: data.id,
          username: data.username,
          status: data.status,
        },
      });
    } catch (error) {
      next(error);
    }
  }
}
