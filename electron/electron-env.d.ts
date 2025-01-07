/// <reference types="vite-plugin-electron/electron-env" />

declare namespace NodeJS {
  interface ProcessEnv {
    /**
     * The built directory structure
     *
     * ```tree
     * ├─┬─┬ dist
     * │ │ └── index.html
     * │ │
     * │ ├─┬ dist-electron
     * │ │ ├── main.js
     * │ │ └── preload.js
     * │
     * ```
     */
    APP_ROOT: string
    /** /dist/ or /public/ */
    VITE_PUBLIC: string
  }
}

interface ElectronApi {
  getSources: () => Promise<DesktopCapturerSource[]>;
  saveAudio: (base64Data: string) => Promise<string | null>;
  close: () => void;
  toggleAlwaysOnTop: () => void;
}

// Used in Renderer process, expose in `preload.ts`
interface Window {
  electron: ElectronApi;
  ipcRenderer: IpcRenderer;
}
