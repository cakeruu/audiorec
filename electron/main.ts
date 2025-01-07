import { app, BrowserWindow, ipcMain, dialog, desktopCapturer } from 'electron'
import { fileURLToPath } from 'node:url'
import os from 'os';
import fs from 'fs'
import path from 'node:path'
import Store from 'electron-store';
import log from 'electron-log';
import { createRequire } from 'module'
import icon from '../resources/icon.png'
import { spawn } from 'child_process';

const require = createRequire(import.meta.url)
const ffmpegPath = require('ffmpeg-static')

function getFfmpegPath(): string {
  if (!ffmpegPath) return ''
  if (app.isPackaged) {
    return ffmpegPath.replace('app.asar', 'app.asar.unpacked')
  }
  return ffmpegPath
}

Object.assign(console, log.functions);

const store = new Store();

const __dirname = path.dirname(fileURLToPath(import.meta.url))


// The built directory structure
//
// ├─┬─┬ dist
// │ │ └── index.html
// │ │
// │ ├─┬ dist-electron
// │ │ ├── main.js
// │ │ └── preload.mjs
// │
process.env.APP_ROOT = path.join(__dirname, '..')

// 🚧 Use ['ENV_NAME'] avoid vite:define plugin - Vite@2.x
export const VITE_DEV_SERVER_URL = process.env['VITE_DEV_SERVER_URL']
export const MAIN_DIST = path.join(process.env.APP_ROOT, 'dist-electron')
export const RENDERER_DIST = path.join(process.env.APP_ROOT, 'dist')

process.env.VITE_PUBLIC = VITE_DEV_SERVER_URL ? path.join(process.env.APP_ROOT, 'public') : RENDERER_DIST

let win: BrowserWindow | null

function createWindow() {
  const isAlwaysOnTop = store.get('alwaysOnTop', true) as boolean;
  win = new BrowserWindow({
    width: 320,
    height: 200,
    alwaysOnTop: isAlwaysOnTop,
    fullscreenable: false,
    resizable: false,
    autoHideMenuBar: true,
    ...(process.platform === 'linux' ? { icon } : {}),
    webPreferences: {
      preload: path.join(__dirname, 'preload.mjs'),
      webSecurity: true,
      sandbox: false,
      devTools: true
    }
  })

  // Test active push message to Renderer-process.
  win.webContents.on('did-finish-load', () => {
    win?.webContents.send('main-process-message', (new Date).toLocaleString())
  })

  if (VITE_DEV_SERVER_URL) {
    win.loadURL(VITE_DEV_SERVER_URL)
  } else {
    // win.loadFile('dist/index.html')
    win.loadFile(path.join(RENDERER_DIST, 'index.html'))
  }
  
  setupAudioHandlers()
  setupDesktopSourceHandlers()

  ipcMain.on('close-app', () => {
    app.quit();
  });

  ipcMain.on('toggle-always-on-top', () => {
    const window = BrowserWindow.getFocusedWindow();
    const newIsAlwaysOnTop = !window?.isAlwaysOnTop();
    if (!window) return;
    window.setAlwaysOnTop(newIsAlwaysOnTop);
    store.set('alwaysOnTop', newIsAlwaysOnTop);
  });
}

// Quit when all windows are closed, except on macOS. There, it's common
// for applications and their menu bar to stay active until the user quits
// explicitly with Cmd + Q.
app.on('window-all-closed', () => {
  if (process.platform !== 'darwin') {
    app.quit()
    win = null
  }
})

app.on('activate', () => {
  // On OS X it's common to re-create a window in the app when the
  // dock icon is clicked and there are no other windows open.
  if (BrowserWindow.getAllWindows().length === 0) {
    createWindow()
  }
})

app.whenReady().then(createWindow)


export function setupAudioHandlers() {
  ipcMain.handle('save-audio', async (_, base64Data: string) => {
    try {
      const tempDir = path.join(os.tmpdir(), 'audio-recorder');
      if (!fs.existsSync(tempDir)) {
        fs.mkdirSync(tempDir, { recursive: true });
      }
      const lastSavedPath = store.get('lastSavedPath', app.getPath('desktop'));
      const { canceled, filePath } = await dialog.showSaveDialog({
        title: 'Save Audio Recording',
        defaultPath: path.join(lastSavedPath as string, `recording-${Date.now()}.wav`),
        filters: [{ name: 'WAV Audio', extensions: ['wav'] }]
      });

      if (canceled || !filePath) return null;

      const tempWebmPath = path.join(tempDir, `temp-${Date.now()}.webm`);

      const buffer = Buffer.from(base64Data, 'base64');
      fs.writeFileSync(tempWebmPath, buffer);

      await new Promise<void>((resolve, reject) => {
        const ffmpegProcess = spawn(getFfmpegPath(), [
          '-y',
          '-i', tempWebmPath,
          '-acodec', 'pcm_s16le',
          '-ar', '44100',
          filePath
        ]);

        ffmpegProcess.on('close', (code) => {
          if (code === 0) {
            resolve();
          } else {
            reject(new Error(`FFmpeg process exited with code ${code}`));
          }
        });

        ffmpegProcess.on('error', (err) => {
          reject(new Error(`FFmpeg process error: ${err.message}`));
        });
      });

      try {
        fs.unlinkSync(tempWebmPath);
      } catch (cleanupError) {
        console.error('Error cleaning up temp file:', cleanupError);
      }
      store.set('lastSavedPath', path.dirname(filePath));
      return filePath;
    } catch (error) {
      console.error('Error saving audio:', error);
      return null;
    }
  });
}

export function setupDesktopSourceHandlers() {
  ipcMain.handle('get-desktop-sources', async () => {
    try {
      const sources = await desktopCapturer.getSources({ 
        types: ['screen'], 
        thumbnailSize: { width: 200, height: 200 } 
      })
      return sources
    } catch (error) {
      console.error('Error getting desktop sources:', error)
      return []
    }
  })

  // Handler for getting desktop stream
  ipcMain.handle('get-desktop-stream', async (event, source: Electron.DesktopCapturerSource) => {
    try {
      const mainWindow = BrowserWindow.fromWebContents(event.sender);
      if (!mainWindow) {
        throw new Error('Main window not found');
      }
  
      const stream = await mainWindow.webContents.executeJavaScript(`
        navigator.mediaDevices.getUserMedia({
          audio: true,
          video: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: '${source.id}'
          }
        })
      `);
      return stream;
    } catch (error) {
      console.error('Error getting desktop stream:', error);
      throw error;
    }
  });
  
}
