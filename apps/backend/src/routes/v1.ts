import { Router } from 'express';
import { AuthController } from '../modules/auth/auth.controller';
import { TokenController, UserController } from '../modules/auth/token.controller';
import { authMiddleware } from '../middleware/authMiddleware';

const router = Router();
const authController = new AuthController();
const tokenController = new TokenController();
const userController = new UserController();

// API Version 1 Routes
router.post('/auth/register', authController.register);
router.post('/auth/login', authController.login);
router.post('/auth/logout', tokenController.logout);
router.post('/auth/refresh', tokenController.refresh);

// Protected Users Profile Routes
router.get('/users/profile', authMiddleware as any, userController.getProfile as any);
router.put('/users/theme', authMiddleware as any, userController.updateTheme as any);
router.put('/users/status', authMiddleware as any, userController.updateStatus as any);

export { router as apiRouter };
