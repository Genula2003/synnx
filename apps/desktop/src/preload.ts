import { contextBridge, ipcRenderer } from 'electron';

contextBridge.exposeInMainWorld('synora', {
  ping: () => ipcRenderer.invoke('synora:ping'),
});
