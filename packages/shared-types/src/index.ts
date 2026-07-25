// Shared TypeScript Definitions for Synora

export interface User {
  id: string;
  username: string;
  email: string;
  avatar: string | null;
  banner: string | null;
  bio: string | null;
  status: 'ONLINE' | 'IDLE' | 'DND' | 'OFFLINE';
  createdAt: string | Date;
  updatedAt: string | Date;
}

export type ThemeName = 'liquid-glass' | 'cotton-candy' | 'clay' | 'midnight' | 'neon-cyber';

export interface ThemePreference {
  id: string;
  userId: string;
  theme: ThemeName;
  blur: number;
  transparency: number;
  shadow: number;
  radius: number;
  animationSpeed: number;
}

export interface RefreshToken {
  id: string;
  token: string;
  userId: string;
  expiresAt: string | Date;
  createdAt: string | Date;
}

export interface AuthResponse {
  user: User;
  accessToken: string;
  refreshToken: string;
  themePreference: ThemePreference | null;
}

export interface ApiResponse<T> {
  success: boolean;
  message?: string;
  data?: T;
  errors?: any;
}

export interface SocketEvents {
  // Client to Server
  CLIENT_STATUS_UPDATE: 'client:status-update';
  CLIENT_THEME_UPDATE: 'client:theme-update';

  // Server to Client
  SERVER_STATUS_CHANGED: 'server:status-changed';
  SERVER_THEME_CHANGED: 'server:theme-changed';
  SERVER_USER_JOINED: 'server:user-joined';
}

export const SOCKET_EVENTS: SocketEvents = {
  CLIENT_STATUS_UPDATE: 'client:status-update',
  CLIENT_THEME_UPDATE: 'client:theme-update',
  SERVER_STATUS_CHANGED: 'server:status-changed',
  SERVER_THEME_CHANGED: 'server:theme-changed',
  SERVER_USER_JOINED: 'server:user-joined',
};
