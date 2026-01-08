const { contextBridge, ipcRenderer } = require('electron');

contextBridge.exposeInMainWorld('electronAPI', {
  onNewSale: (callback) => ipcRenderer.on('new-sale', callback),
  onShowShortcuts: (callback) => ipcRenderer.on('show-shortcuts', callback),
  platform: process.platform,
  isElectron: true
});
