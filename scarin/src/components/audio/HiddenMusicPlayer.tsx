"use client";

import { useAudioPlayer } from "@/hooks/useAudioPlayer";
import { Music, Pause } from "lucide-react";
import { cn } from "@/lib/utils";

export function HiddenMusicPlayer() {
  const { isPlaying, togglePlay } = useAudioPlayer("/audio/Morocha - Milo J LyricLetra.mp3", true);

  return (
    <button
      onClick={togglePlay}
      className={cn(
        "fixed bottom-6 right-6 p-4 rounded-full bg-purple-600 text-white shadow-xl shadow-purple-900/20 z-50 transition-transform duration-300 border-2 border-white/30 backdrop-blur-md",
        isPlaying ? "animate-pulse scale-110" : "hover:scale-110"
      )}
      aria-label="Reproducir o pausar música"
    >
      {isPlaying ? <Pause size={24} /> : <Music size={24} />}
    </button>
  );
}
