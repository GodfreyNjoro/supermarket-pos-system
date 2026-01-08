const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  // Existing APIs
  newSale: () => ipcRenderer.send('new-sale'),
  showShortcuts: () => ipcRenderer.send('show-shortcuts'),
  platform: process.platform,
  
  // Database config APIs
  getDbConfig: () => ipcRenderer.invoke('get-db-config'),
  saveDbConfig: (config) => ipcRenderer.invoke('save-db-config', config),
  
  // Sync APIs
  getSyncStatus: () => ipcRenderer.invoke('get-sync-status'),
  triggerSync: () => ipcRenderer.invoke('trigger-sync'),
  
  // App info
  getAppVersion: () => ipcRenderer.invoke('get-app-version'),
  isOffline: () => ipcRenderer.invoke('is-offline')
});
