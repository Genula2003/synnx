import express, { Express, Request, Response, NextFunction } from 'express';
import http from 'http';
import cors from 'cors';
import helmet from 'helmet';
import { Server as SocketIOServer } from 'socket.io';
import { config } from './config';
import { logger } from './lib/logger';
import { connectDatabase } from './database';
import { apiRouter } from './routes/v1';
import { setupSockets } from './sockets';
import { errorHandler } from './middleware/errorHandler';

export function createExpressApp(): Express {
  const app = express();

  app.use(helmet());
  app.use(cors({
    origin: true,
    credentials: true,
  }));
  app.use(express.json());
  app.use(express.urlencoded({ extended: true }));

  app.use((req: Request, res: Response, next: NextFunction) => {
    logger.info(`HTTP ${req.method} ${req.url}`);
    next();
  });

  // Health check endpoint
  app.get('/health', (req: Request, res: Response) => {
    res.json({ status: 'OK', timestamp: new Date() });
  });

  // Versioned API Routes
  app.use('/api/v1', apiRouter);

  // Centralized Error Handler
  app.use(errorHandler);

  return app;
}

export function startServer() {
  const app = createExpressApp();
  const server = http.createServer(app);

  const io = new SocketIOServer(server, {
    cors: {
      origin: '*',
      methods: ['GET', 'POST'],
    }
  });

  // Hook up Sockets
  setupSockets(io);

  connectDatabase().then(() => {
    server.listen(config.port, () => {
      logger.info(`[Synora Engine] running in ${config.nodeEnv} on port ${config.port}`);
    });
  }).catch((err) => {
    logger.error('Startup error:', err);
  });
}

if (require.main === module) {
  startServer();
}
export { startServer as default };
