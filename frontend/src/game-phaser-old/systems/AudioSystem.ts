// ============= AUDIO SYSTEM =============
// Manages all sound effects and music for the game

export interface AudioConfig {
  sfxVolume: number;
  musicVolume: number;
  masterVolume: number;
  muted: boolean;
}

export class AudioSystem {
  private scene: Phaser.Scene;
  private config: AudioConfig;
  private currentMusic?: Phaser.Sound.BaseSound;
  private musicKey?: string;

  // Sound effect keys (placeholder until assets are added)
  public readonly SFX = {
    CLICK: 'sfx_click',
    HOVER: 'sfx_hover',
    COIN: 'sfx_coin',
    LEVEL_UP: 'sfx_levelup',
    VICTORY: 'sfx_victory',
    DEFEAT: 'sfx_defeat',
    HIT: 'sfx_hit',
    ITEM_GET: 'sfx_item',
    MENU_OPEN: 'sfx_menu_open',
    MENU_CLOSE: 'sfx_menu_close',
    ACHIEVEMENT: 'sfx_achievement',
    QUEST_COMPLETE: 'sfx_quest_complete',
    CHEST_OPEN: 'sfx_chest_open',
    ABILITY: 'sfx_ability',
    ERROR: 'sfx_error',
    SUCCESS: 'sfx_success'
  };

  // Music keys (placeholder until assets are added)
  public readonly MUSIC = {
    MENU: 'music_menu',
    WORLD_MAP: 'music_world',
    BATTLE: 'music_battle',
    BOSS: 'music_boss',
    VICTORY: 'music_victory',
    SHOP: 'music_shop'
  };

  constructor(scene: Phaser.Scene) {
    this.scene = scene;

    // Load config from localStorage or use defaults
    const savedConfig = localStorage.getItem('audioConfig');
    if (savedConfig) {
      this.config = JSON.parse(savedConfig);
    } else {
      this.config = {
        sfxVolume: 0.7,
        musicVolume: 0.5,
        masterVolume: 1.0,
        muted: false
      };
    }
  }

  /**
   * Play a sound effect
   */
  public playSFX(key: string, config?: Phaser.Types.Sound.SoundConfig): void {
    if (this.config.muted) return;

    // Check if sound exists (for now, we'll just log)
    // In production, this will play the actual sound
    try {
      const volume = this.config.sfxVolume * this.config.masterVolume;

      // Placeholder: will play when assets are loaded
      // this.scene.sound.play(key, { ...config, volume });

      console.log(`🔊 [SFX] ${key} (volume: ${volume.toFixed(2)})`);
    } catch (error) {
      // Sound not loaded yet
      console.warn(`⚠️ Sound ${key} not loaded`);
    }
  }

  /**
   * Play music (with fade in)
   */
  public playMusic(key: string, fadeInDuration: number = 1000): void {
    if (this.config.muted) return;

    // Don't restart if same music is already playing
    if (this.musicKey === key && this.currentMusic?.isPlaying) {
      return;
    }

    // Stop current music with fade out
    if (this.currentMusic?.isPlaying) {
      this.stopMusic(500);
    }

    // Placeholder: will play when assets are loaded
    try {
      // this.currentMusic = this.scene.sound.add(key, {
      //   loop: true,
      //   volume: 0
      // });
      // this.currentMusic.play();
      //
      // // Fade in
      // this.scene.tweens.add({
      //   targets: this.currentMusic,
      //   volume: this.config.musicVolume * this.config.masterVolume,
      //   duration: fadeInDuration,
      //   ease: 'Linear'
      // });

      this.musicKey = key;
      console.log(`🎵 [MUSIC] Playing ${key} (fade in: ${fadeInDuration}ms)`);
    } catch (error) {
      console.warn(`⚠️ Music ${key} not loaded`);
    }
  }

  /**
   * Stop music (with fade out)
   */
  public stopMusic(fadeOutDuration: number = 1000): void {
    if (!this.currentMusic) return;

    // Placeholder: will work when assets are loaded
    // this.scene.tweens.add({
    //   targets: this.currentMusic,
    //   volume: 0,
    //   duration: fadeOutDuration,
    //   ease: 'Linear',
    //   onComplete: () => {
    //     this.currentMusic?.stop();
    //     this.currentMusic = undefined;
    //     this.musicKey = undefined;
    //   }
    // });

    console.log(`🎵 [MUSIC] Stopping (fade out: ${fadeOutDuration}ms)`);
    this.currentMusic = undefined;
    this.musicKey = undefined;
  }

  /**
   * Set SFX volume
   */
  public setSFXVolume(volume: number): void {
    this.config.sfxVolume = Phaser.Math.Clamp(volume, 0, 1);
    this.saveConfig();
  }

  /**
   * Set music volume
   */
  public setMusicVolume(volume: number): void {
    this.config.musicVolume = Phaser.Math.Clamp(volume, 0, 1);

    // Update current music volume if playing
    if (this.currentMusic?.isPlaying) {
      // this.currentMusic.setVolume(this.config.musicVolume * this.config.masterVolume);
    }

    this.saveConfig();
  }

  /**
   * Set master volume
   */
  public setMasterVolume(volume: number): void {
    this.config.masterVolume = Phaser.Math.Clamp(volume, 0, 1);

    // Update current music volume if playing
    if (this.currentMusic?.isPlaying) {
      // this.currentMusic.setVolume(this.config.musicVolume * this.config.masterVolume);
    }

    this.saveConfig();
  }

  /**
   * Toggle mute
   */
  public toggleMute(): boolean {
    this.config.muted = !this.config.muted;

    if (this.config.muted) {
      if (this.currentMusic?.isPlaying) {
        // this.currentMusic.pause();
      }
    } else {
      if (this.currentMusic) {
        // this.currentMusic.resume();
      }
    }

    this.saveConfig();
    return this.config.muted;
  }

  /**
   * Get current config
   */
  public getConfig(): AudioConfig {
    return { ...this.config };
  }

  /**
   * Save config to localStorage
   */
  private saveConfig(): void {
    localStorage.setItem('audioConfig', JSON.stringify(this.config));
  }

  /**
   * Preload all audio assets (call this in BootScene)
   */
  public static preloadAudio(scene: Phaser.Scene): void {
    // Placeholder: Load audio files when they exist
    //
    // SFX
    // scene.load.audio('sfx_click', 'assets/audio/sfx/click.mp3');
    // scene.load.audio('sfx_coin', 'assets/audio/sfx/coin.mp3');
    // scene.load.audio('sfx_levelup', 'assets/audio/sfx/levelup.mp3');
    // ... etc
    //
    // Music
    // scene.load.audio('music_menu', 'assets/audio/music/menu.mp3');
    // scene.load.audio('music_battle', 'assets/audio/music/battle.mp3');
    // ... etc

    console.log('🎵 Audio preload ready (assets pending)');
  }
}

// Helper functions for quick access
export function createAudioSystem(scene: Phaser.Scene): AudioSystem {
  return new AudioSystem(scene);
}

console.log('🎵 Audio System loaded');
