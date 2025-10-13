// ============= USE AUDIO HOOK =============
// Sistema de áudio com controle de volume e mute

import { useCallback, useRef, useState, useEffect } from 'react';

export type SoundType = 'sfx' | 'music';

interface AudioSettings {
  masterVolume: number;
  musicVolume: number;
  sfxVolume: number;
  masterMuted: boolean;
  musicMuted: boolean;
  sfxMuted: boolean;
}

const DEFAULT_SETTINGS: AudioSettings = {
  masterVolume: 0.7,
  musicVolume: 0.5,
  sfxVolume: 0.7,
  masterMuted: false,
  musicMuted: false,
  sfxMuted: false,
};

// Load settings from localStorage
const loadSettings = (): AudioSettings => {
  try {
    const stored = localStorage.getItem('audio-settings');
    if (stored) {
      return { ...DEFAULT_SETTINGS, ...JSON.parse(stored) };
    }
  } catch (error) {
    console.error('Failed to load audio settings:', error);
  }
  return DEFAULT_SETTINGS;
};

// Save settings to localStorage
const saveSettings = (settings: AudioSettings) => {
  try {
    localStorage.setItem('audio-settings', JSON.stringify(settings));
  } catch (error) {
    console.error('Failed to save audio settings:', error);
  }
};

export const useAudio = () => {
  const [settings, setSettings] = useState<AudioSettings>(loadSettings);
  const musicAudioRef = useRef<HTMLAudioElement | null>(null);
  const sfxAudioRefs = useRef<Map<string, HTMLAudioElement>>(new Map());

  // Update localStorage when settings change
  useEffect(() => {
    saveSettings(settings);
  }, [settings]);

  /**
   * Calculate final volume for a sound
   */
  const getFinalVolume = useCallback(
    (type: SoundType): number => {
      if (settings.masterMuted) return 0;

      if (type === 'music') {
        return settings.musicMuted ? 0 : settings.masterVolume * settings.musicVolume;
      }

      return settings.sfxMuted ? 0 : settings.masterVolume * settings.sfxVolume;
    },
    [settings]
  );

  /**
   * Play a sound effect
   */
  const playSfx = useCallback(
    (soundId: string, volume: number = 1.0) => {
      const finalVolume = getFinalVolume('sfx') * volume;

      if (finalVolume === 0) return;

      // For now, we'll use a simple beep sound (placeholder)
      // In production, you would load actual audio files
      const context = new (window.AudioContext || (window as any).webkitAudioContext)();
      const oscillator = context.createOscillator();
      const gainNode = context.createGain();

      oscillator.connect(gainNode);
      gainNode.connect(context.destination);

      // Different frequencies for different sounds
      const frequencies: Record<string, number> = {
        click: 800,
        attack: 400,
        damage: 300,
        heal: 600,
        victory: 1000,
        defeat: 200,
        levelup: 1200,
        equip: 700,
        unequip: 500,
      };

      oscillator.frequency.value = frequencies[soundId] || 500;
      oscillator.type = 'sine';
      gainNode.gain.value = finalVolume * 0.1; // Lower base volume

      oscillator.start();
      oscillator.stop(context.currentTime + 0.1);
    },
    [getFinalVolume]
  );

  /**
   * Play background music (loop)
   */
  const playMusic = useCallback(
    (musicId: string) => {
      // Stop current music if playing
      if (musicAudioRef.current) {
        musicAudioRef.current.pause();
        musicAudioRef.current = null;
      }

      // For now, placeholder (would load actual music file)
      // const audio = new Audio(`/assets/music/${musicId}.mp3`);
      // audio.loop = true;
      // audio.volume = getFinalVolume('music');
      // musicAudioRef.current = audio;
      // audio.play().catch(console.error);

      console.log(`Playing music: ${musicId} at volume ${getFinalVolume('music')}`);
    },
    [getFinalVolume]
  );

  /**
   * Stop background music
   */
  const stopMusic = useCallback(() => {
    if (musicAudioRef.current) {
      musicAudioRef.current.pause();
      musicAudioRef.current = null;
    }
  }, []);

  /**
   * Update master volume
   */
  const setMasterVolume = useCallback((volume: number) => {
    setSettings((prev) => ({ ...prev, masterVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  /**
   * Update music volume
   */
  const setMusicVolume = useCallback((volume: number) => {
    setSettings((prev) => ({ ...prev, musicVolume: Math.max(0, Math.min(1, volume)) }));

    // Update current music volume
    if (musicAudioRef.current) {
      musicAudioRef.current.volume = getFinalVolume('music');
    }
  }, [getFinalVolume]);

  /**
   * Update SFX volume
   */
  const setSfxVolume = useCallback((volume: number) => {
    setSettings((prev) => ({ ...prev, sfxVolume: Math.max(0, Math.min(1, volume)) }));
  }, []);

  /**
   * Toggle master mute
   */
  const toggleMasterMute = useCallback(() => {
    setSettings((prev) => ({ ...prev, masterMuted: !prev.masterMuted }));
  }, []);

  /**
   * Toggle music mute
   */
  const toggleMusicMute = useCallback(() => {
    setSettings((prev) => ({ ...prev, musicMuted: !prev.musicMuted }));
  }, []);

  /**
   * Toggle SFX mute
   */
  const toggleSfxMute = useCallback(() => {
    setSettings((prev) => ({ ...prev, sfxMuted: !prev.sfxMuted }));
  }, []);

  /**
   * Reset settings to default
   */
  const resetSettings = useCallback(() => {
    setSettings(DEFAULT_SETTINGS);
  }, []);

  // Cleanup on unmount
  useEffect(() => {
    return () => {
      stopMusic();
      sfxAudioRefs.current.forEach((audio) => {
        audio.pause();
      });
      sfxAudioRefs.current.clear();
    };
  }, [stopMusic]);

  return {
    // Settings
    settings,

    // Volume controls
    setMasterVolume,
    setMusicVolume,
    setSfxVolume,

    // Mute controls
    toggleMasterMute,
    toggleMusicMute,
    toggleSfxMute,

    // Playback
    playSfx,
    playMusic,
    stopMusic,

    // Reset
    resetSettings,
  };
};
