import { Server, Socket } from 'socket.io';
import { logger } from '../lib/logger';
import { verifyAccessToken } from '../modules/auth/auth.utils';

// Store connected user state
interface PresenceUser {
  socketId: string;
  userId: string;
  status: 'ONLINE' | 'IDLE' | 'DND' | 'OFFLINE';
  theme: string;
}

const connections: Map<string, PresenceUser> = new Map();

export function setupSockets(io: Server) {
  // Authentication, Presence and Notification namespaces / modular organization
  const mainNamespace = io.of('/synora');

  mainNamespace.use((socket, next) => {
    try {
      const token = socket.handshake.auth.token || socket.handshake.query.token;
      if (!token) {
        return next(new Error('Authentication failed: Missing token'));
      }
      const decoded = verifyAccessToken(token);
      (socket as any).userId = decoded.userId;
      next();
    } catch (err) {
      next(new Error('Authentication failed: Invalid token'));
    }
  });

  mainNamespace.on('connection', (socket: Socket) => {
    const userId = (socket as any).userId;
    logger.info(`Namespace Client Authenticated via Socket: ${socket.id} (user: ${userId})`);

    // Default presence state
    const presence: PresenceUser = {
      socketId: socket.id,
      userId,
      status: 'ONLINE',
      theme: 'liquid-glass',
    };
    connections.set(socket.id, presence);

    // Broadcast user join / notification
    mainNamespace.emit('server:user-joined', { userId, socketId: socket.id });

    // Handle incoming client events
    socket.on('client:status-update', (data: { status: 'ONLINE' | 'IDLE' | 'DND' | 'OFFLINE' }) => {
      logger.info(`Client presence status update: user ${userId} to ${data.status}`);
      const user = connections.get(socket.id);
      if (user) {
        user.status = data.status;
        mainNamespace.emit('server:status-changed', { userId, status: data.status });
      }
    });

    socket.on('client:theme-update', (data: { theme: string }) => {
      logger.info(`Client visual theme sync: user ${userId} to ${data.theme}`);
      const user = connections.get(socket.id);
      if (user) {
        user.theme = data.theme;
        mainNamespace.emit('server:theme-changed', { userId, theme: data.theme });
      }
    });

    socket.on('disconnect', () => {
      logger.info(`Presence disconnected: ${socket.id} for user ${userId}`);
      connections.delete(socket.id);
    });
  });
}
export { connections as socketPresence };
