/* eslint-disable @typescript-eslint/no-explicit-any */
// hooks/useAudioRecorder.ts
import { writable } from 'svelte/store';
import type { DesktopCapturerSource } from 'electron';

function createAudioStore() {
  const isRecording = writable(false);
  const mediaRecorder = writable<MediaRecorder | null>(null);
  const selectedSource = writable<DesktopCapturerSource | undefined>();
  const error = writable<string | null>(null);
  const availableSources = writable<DesktopCapturerSource[]>([]);
  const sourcesLoading = writable(false);
  const sourcesError = writable(false);

  const arrayBufferToBase64 = (buffer: ArrayBuffer): string => {
    const bytes = new Uint8Array(buffer);
    let binary = '';
    for (let i = 0; i < bytes.byteLength; i++) {
      binary += String.fromCharCode(bytes[i]);
    }
    return window.btoa(binary);
  };

  const fetchSources = async () => {
    sourcesLoading.set(true);
    try {
      console.log('🔄 Fetching audio sources...');
      const sources = await window.electron.getSources();
      availableSources.set(sources);
      if (sources.length > 0) {
        selectedSource.set(sources[0]);
      }
    } catch (err) {
      sourcesError.set(true);
    } finally {
      sourcesLoading.set(false);
    }
  };

  const startRecording = async () => {
    console.log('🎙️ Starting recording process...');
    try {
      error.set(null);
      let source: DesktopCapturerSource | undefined;
      selectedSource.subscribe(value => {
        source = value;
      })();

      if (!source) {
        console.error('❌ No source selected');
        error.set('Please select a source to record');
        return;
      }

      const constraints = {
        audio: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id
          }
        },
        video: {
          mandatory: {
            chromeMediaSource: 'desktop',
            chromeMediaSourceId: source.id
          }
        }
      };

      const stream = await navigator.mediaDevices.getUserMedia(constraints as any);
      const audioTrack = stream.getAudioTracks()[0];
      const audioStream = new MediaStream([audioTrack]);

      const recorder = new MediaRecorder(audioStream, {
        mimeType: 'audio/webm;codecs=opus'
      });

      const chunks: BlobPart[] = [];

      recorder.ondataavailable = (e) => {
        if (e.data.size > 0) {
          chunks.push(e.data);
        }
      };

      recorder.onstop = async () => {
        if (chunks.length > 0) {
          try {
            const blob = new Blob(chunks, { type: 'audio/webm' });
            const arrayBuffer = await blob.arrayBuffer();
            const base64Data = arrayBufferToBase64(arrayBuffer);
            const savedFilePath = await window.electron.saveAudio(base64Data);
            if (savedFilePath) {
              console.log('✅ Audio saved to:', savedFilePath);
            }
          } catch (saveError) {
            error.set('Failed to save audio');
          }
          stream.getTracks().forEach(track => track.stop());
        }
      };

      mediaRecorder.set(recorder);
      isRecording.set(true);
      recorder.start(1000);

    } catch (err: any) {
      console.error('❌ Recording error:', err);
      error.set('Failed to start recording');
    }
  };

  const stopRecording = () => {
    mediaRecorder.subscribe(recorder => {
      if (recorder && recorder.state !== 'inactive') {
        console.log('⏹️ Stopping recording...');
        recorder.stop();
        isRecording.set(false);
        mediaRecorder.set(null);
      }
    })();
  };

  fetchSources();

  return {
    isRecording,
    startRecording,
    stopRecording,
    availableSources,
    selectedSource,
    error,
    sourcesLoading,
    sourcesError,
    refetchSources: fetchSources
  };
}

export const useAudioRecorder = createAudioStore;