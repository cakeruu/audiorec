import { contextBridge, ipcRenderer } from "electron";
const api = {
  getSources: () => ipcRenderer.invoke("get-desktop-sources"),
  saveAudio: (base64Data) => ipcRenderer.invoke("save-audio", base64Data),
  close: () => ipcRenderer.send("close-app"),
  toggleAlwaysOnTop: () => ipcRenderer.send("toggle-always-on-top")
};
if (process.contextIsolated) {
  try {
    contextBridge.exposeInMainWorld("electron", api);
  } catch (error) {
    console.error(error);
  }
} else {
  window.electron = api;
}
