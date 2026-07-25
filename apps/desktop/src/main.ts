import { app, BrowserWindow, ipcMain } from 'electron';
import * as path from 'path';

let mainWindow: BrowserWindow | null = null;

function createWindow() {
  mainWindow = new BrowserWindow({
    width: 1200,
    height: 800,
    frame: true,
    title: 'Synora OS',
    webPreferences: {
      preload: path.join(__dirname, 'preload.js'),
      contextIsolation: true,
      nodeIntegration: false,
    },
  });

  // In production/sandbox, load the compiled React index.html
  // Otherwise, load Vite dev server
  const indexPath = path.join(__dirname, '../../frontend/dist/index.html');
  mainWindow.loadFile(indexPath).catch(() => {
    mainWindow?.loadURL('http://localhost:5173');
  });

  mainWindow.on('closed', () => {
    mainWindow = null;
  });
}

app.whenReady().then(() => {
  createWindow();

  app.on('activate', () => {
    if (BrowserWindow.getAllWindows().length === 0) {
      createWindow();
    }
  });
});

app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit();
  }
});

// Secure IPC handlers
ipcMain.handle('synora:ping', async () => {
  return 'pong';
});
