"use client";

import { useState, useEffect, useRef } from "react";

export function useAudioPlayer(src: string, autoPlay: boolean = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const audioRef = useRef<HTMLAudioElement | null>(null);

  useEffect(() => {
    // Only initialize if we are on the client
    if (typeof window !== 'undefined') {
      audioRef.current = new Audio(src);
      audioRef.current.loop = true;
      audioRef.current.volume = 0.5;

      if (autoPlay) {
        // Intenta reproducir automáticamente.
        // Nota: Los navegadores modernos bloquean el autoplay si el usuario no ha interactuado con la página primero.
        audioRef.current.play().then(() => {
          setIsPlaying(true);
        }).catch((err) => {
          console.warn("Autoplay bloqueado por el navegador. El usuario debe hacer clic.", err);
        });
      }
    }

    return () => {
      if (audioRef.current) {
        audioRef.current.pause();
        audioRef.current = null;
      }
    };
  }, [src, autoPlay]);

  const togglePlay = async () => {
    if (audioRef.current) {
      if (isPlaying) {
        audioRef.current.pause();
        setIsPlaying(false);
      } else {
        try {
          await audioRef.current.play();
          setIsPlaying(true);
        } catch (error) {
          console.error("Error al reproducir audio.", error);
        }
      }
    }
  };

  return { isPlaying, togglePlay };
}
