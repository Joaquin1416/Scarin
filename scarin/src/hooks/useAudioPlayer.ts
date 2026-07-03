"use client";

import { useState, useEffect, useRef } from "react";

const FADE_DURATION = 3000; // 3 seconds fade
const TARGET_VOLUME = 0.5;

export function useAudioPlayer(playlist: string[], autoPlay: boolean = false) {
  const [isPlaying, setIsPlaying] = useState(false);
  const currentIndexRef = useRef(0);

  const audioRefs = useRef<(HTMLAudioElement | null)[]>([null, null]);
  const activeIndexRef = useRef(0);
  
  const fadeIntervalRef = useRef<NodeJS.Timeout | null>(null);
  const hasStartedNextRef = useRef(false);

  useEffect(() => {
    if (typeof window !== 'undefined') {
      audioRefs.current[0] = new Audio(playlist[0]);
      audioRefs.current[1] = new Audio();

      audioRefs.current[0].volume = TARGET_VOLUME;
      audioRefs.current[1].volume = 0;

      const handleTimeUpdate = () => {
        const activeIdx = activeIndexRef.current;
        const activeAudio = audioRefs.current[activeIdx];
        
        // Comprobar si falta poco para terminar
        if (activeAudio && activeAudio.duration) {
          const timeLeft = activeAudio.duration - activeAudio.currentTime;
          
          if (timeLeft <= FADE_DURATION / 1000 && !hasStartedNextRef.current) {
            playNextSong();
          }
        }
      };

      const handleEnded = () => {
         if (!hasStartedNextRef.current) {
             playNextSong();
         }
      };

      const playNextSong = () => {
        hasStartedNextRef.current = true;
        const nextPlaylistIndex = (currentIndexRef.current + 1) % playlist.length;
        currentIndexRef.current = nextPlaylistIndex;
        
        const currentAudioIdx = activeIndexRef.current;
        const nextAudioIdx = currentAudioIdx === 0 ? 1 : 0;
        
        const currentAudio = audioRefs.current[currentAudioIdx];
        const nextAudio = audioRefs.current[nextAudioIdx];
        
        if (nextAudio && currentAudio) {
            nextAudio.src = playlist[nextPlaylistIndex];
            nextAudio.volume = 0;
            
            // Iniciar reproducción de la siguiente canción
            nextAudio.play().then(() => {
                activeIndexRef.current = nextAudioIdx;
                crossfade(currentAudio, nextAudio);
            }).catch(e => {
                console.error("Error playing next song", e);
                hasStartedNextRef.current = false;
            });
        }
      };

      const crossfade = (fadeOutAudio: HTMLAudioElement, fadeInAudio: HTMLAudioElement) => {
        const steps = 30;
        const stepTime = FADE_DURATION / steps;
        const volumeStep = TARGET_VOLUME / steps;
        
        let currentStep = 0;
        
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        
        fadeIntervalRef.current = setInterval(() => {
            currentStep++;
            
            const newFadeOutVol = Math.max(0, TARGET_VOLUME - (volumeStep * currentStep));
            const newFadeInVol = Math.min(TARGET_VOLUME, volumeStep * currentStep);
            
            fadeOutAudio.volume = newFadeOutVol;
            fadeInAudio.volume = newFadeInVol;
            
            if (currentStep >= steps) {
                if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
                fadeOutAudio.pause();
                fadeOutAudio.currentTime = 0;
                hasStartedNextRef.current = false;
            }
        }, stepTime);
      };

      audioRefs.current.forEach(audio => {
          if (audio) {
              audio.addEventListener('timeupdate', handleTimeUpdate);
              audio.addEventListener('ended', handleEnded);
          }
      });

      if (autoPlay) {
        const attemptPlay = () => {
           audioRefs.current[0]?.play().then(() => {
              setIsPlaying(true);
           }).catch((err) => {
              console.warn("Autoplay bloqueado. Esperando interacción del usuario.", err);
              const playOnInteraction = () => {
                  audioRefs.current[0]?.play().then(() => {
                      setIsPlaying(true);
                  }).catch(() => {});
                  document.removeEventListener('click', playOnInteraction);
                  document.removeEventListener('keydown', playOnInteraction);
                  document.removeEventListener('scroll', playOnInteraction);
              };
              document.addEventListener('click', playOnInteraction);
              document.addEventListener('keydown', playOnInteraction);
              document.addEventListener('scroll', playOnInteraction);
          });
        };
        attemptPlay();
      }

      return () => {
        if (fadeIntervalRef.current) clearInterval(fadeIntervalRef.current);
        audioRefs.current.forEach(audio => {
            if (audio) {
                audio.removeEventListener('timeupdate', handleTimeUpdate);
                audio.removeEventListener('ended', handleEnded);
                audio.pause();
            }
        });
      };
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []); // Solo ejecutar al montar

  const togglePlay = async () => {
    const activeAudio = audioRefs.current[activeIndexRef.current];
    const otherAudio = audioRefs.current[activeIndexRef.current === 0 ? 1 : 0];
    
    if (activeAudio) {
      if (isPlaying) {
        activeAudio.pause();
        if (hasStartedNextRef.current && otherAudio) {
            otherAudio.pause(); // También pausar si estaba en medio de crossfade
        }
        setIsPlaying(false);
      } else {
        try {
          await activeAudio.play();
          if (hasStartedNextRef.current && otherAudio) {
              await otherAudio.play();
          }
          setIsPlaying(true);
        } catch (error) {
          console.error("Error al reproducir audio.", error);
        }
      }
    }
  };

  return { isPlaying, togglePlay };
}
