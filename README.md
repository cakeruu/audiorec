# AudioRec

A simple desktop audio recorder app built with **Svelte**, **TypeScript**, and **Electron**.

## Features

- **Desktop Audio Recording**: Capture system audio/screen audio
- **Simple Interface**: Minimal UI with record/stop buttons  
- **Always on Top**: Toggle with `Ctrl+T` to keep the window visible
- **Auto-convert**: Records to WebM, converts to WAV using FFmpeg
- **Save Dialog**: Choose where to save your recordings

## Usage

Run `npm run dev` to start the development server.

**Controls:**
- Red circle button: Start recording
- Blue square button: Stop recording  
- `Ctrl+T`: Toggle always on top

The app automatically detects available screen sources and saves recordings as WAV files to your chosen location.
