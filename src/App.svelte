<script lang="ts">
  import { Circle, Square } from "lucide-svelte";
  import { onMount, onDestroy } from "svelte";
  import { useAudioRecorder } from "./useAudioRecorder";
  const {
    isRecording,
    startRecording,
    stopRecording,
    availableSources,
    error,
    sourcesLoading,
    sourcesError,
  } = useAudioRecorder();

  const handleKeyDown = (event: KeyboardEvent) => {
    if (event.ctrlKey && event.key === "t") {
      event.preventDefault();
      window.electron.toggleAlwaysOnTop();
    }
  };

  onMount(() => {
    document.addEventListener("keydown", handleKeyDown);
  });

  onDestroy(() => {
    document.removeEventListener("keydown", handleKeyDown);
  });
</script>

<div class="min-h-screen bg-[#1d1d1d] flex items-center justify-center">
  <div class="rounded-xl">
    <div class="flex justify-center gap-6 mt-3">
      <button
        on:click={startRecording}
        disabled={$isRecording ||
          $availableSources.length === 0 ||
          $sourcesLoading}
        class="p-4 rounded-full bg-red-500 transition-all duration-300"
        class:cursor-not-allowed={$isRecording ||
          $availableSources.length === 0 ||
          $sourcesLoading}
        class:hover:bg-red-900={!$isRecording &&
          $availableSources.length > 0 &&
          !$sourcesLoading}
        class:animate-pulse={$isRecording}
      >
        <Circle class="w-8 h-8 text-white" />
      </button>

      <button
        on:click={stopRecording}
        disabled={!$isRecording}
        class="p-4 rounded-full transition-all duration-300"
        class:bg-[#2e2e2e]={!$isRecording}
        class:cursor-not-allowed={!$isRecording}
        class:bg-[#29f]={$isRecording}
        class:hover:bg-[#317dc0]={$isRecording}
      >
        <Square class="w-8 h-8 text-white" />
      </button>
    </div>

    {#if $error}
      <div
        class="bg-red-500/20 text-red-300 text-sm p-2 rounded-lg mt-2 text-center"
      >
        {$error}
      </div>
    {/if}

    {#if $sourcesError}
      <div
        class="bg-red-500/20 text-red-300 text-sm p-2 rounded-lg mt-2 text-center"
      >
        Error loading audio sources
      </div>
    {/if}
  </div>
</div>
