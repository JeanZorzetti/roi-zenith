import Phaser from 'phaser';
import { SCENE_KEYS, COLORS } from '../config/gameConfig';
import { AudioSystem } from '../systems/AudioSystem';
import tutorialSystem from '../systems/TutorialSystem';

export class SettingsScene extends Phaser.Scene {
  private audioSystem!: AudioSystem;
  private returnScene: string = SCENE_KEYS.MENU;

  constructor() {
    super({ key: SCENE_KEYS.SETTINGS });
  }

  init(data: { returnScene?: string }) {
    this.returnScene = data.returnScene || SCENE_KEYS.MENU;
  }

  create(): void {
    const { width, height } = this.cameras.main;

    this.audioSystem = new AudioSystem(this);

    // Background
    this.add.rectangle(0, 0, width, height, 0x0f0f1e).setOrigin(0);

    // Title bar
    const titleBar = this.add.rectangle(width / 2, 50, width - 40, 70, 0x1a1a2e, 0.98).setOrigin(0.5);
    titleBar.setStrokeStyle(3, 0x6c5ce7);

    this.add.text(width / 2, 50, '⚙️ Configurações', {
      fontSize: '28px',
      color: COLORS.primary,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Close button
    const closeBtn = this.add.text(width - 60, 50, '✕', {
      fontSize: '32px',
      color: COLORS.text
    }).setOrigin(0.5);

    closeBtn.setInteractive({ useHandCursor: true });
    closeBtn.on('pointerdown', () => {
      this.scene.stop(SCENE_KEYS.SETTINGS);
      this.scene.resume(this.returnScene);
    });

    closeBtn.on('pointerover', () => closeBtn.setColor(COLORS.danger));
    closeBtn.on('pointerout', () => closeBtn.setColor(COLORS.text));

    // Settings panel
    const panelY = 140;
    this.createAudioSettings(width, panelY);
    this.createGameplaySettings(width, panelY + 240);
    this.createDataSettings(width, panelY + 400);
  }

  private createAudioSettings(width: number, startY: number): void {
    const config = this.audioSystem.getConfig();

    // Section title
    this.add.text(width / 2, startY, '🔊 Áudio', {
      fontSize: '22px',
      color: COLORS.warning,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Master Volume
    this.createVolumeSlider(
      width,
      startY + 50,
      'Volume Master',
      config.masterVolume,
      (value) => this.audioSystem.setMasterVolume(value)
    );

    // Music Volume
    this.createVolumeSlider(
      width,
      startY + 100,
      'Volume Música',
      config.musicVolume,
      (value) => this.audioSystem.setMusicVolume(value)
    );

    // SFX Volume
    this.createVolumeSlider(
      width,
      startY + 150,
      'Volume SFX',
      config.sfxVolume,
      (value) => this.audioSystem.setSFXVolume(value)
    );

    // Mute toggle
    const muteBtn = this.add.rectangle(width / 2 + 150, startY + 200, 100, 35,
      config.muted ? 0xe74c3c : 0x2ecc71, 1);
    muteBtn.setStrokeStyle(2, 0xffffff);

    const muteText = this.add.text(width / 2 + 150, startY + 200,
      config.muted ? '🔇 Mudo' : '🔊 Som', {
      fontSize: '14px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    muteBtn.setInteractive({ useHandCursor: true });
    muteBtn.on('pointerdown', () => {
      const isMuted = this.audioSystem.toggleMute();
      muteBtn.setFillStyle(isMuted ? 0xe74c3c : 0x2ecc71);
      muteText.setText(isMuted ? '🔇 Mudo' : '🔊 Som');
    });
  }

  private createVolumeSlider(
    width: number,
    y: number,
    label: string,
    initialValue: number,
    onChange: (value: number) => void
  ): void {
    // Label
    this.add.text(width / 2 - 180, y, label, {
      fontSize: '16px',
      color: COLORS.text
    }).setOrigin(0, 0.5);

    // Slider track
    const trackWidth = 200;
    const track = this.add.rectangle(width / 2 + 50, y, trackWidth, 8, 0x475569, 1);

    // Slider fill
    const fill = this.add.rectangle(
      width / 2 + 50 - trackWidth / 2,
      y,
      trackWidth * initialValue,
      8,
      0x6c5ce7,
      1
    ).setOrigin(0, 0.5);

    // Slider handle
    const handle = this.add.circle(
      width / 2 + 50 - trackWidth / 2 + trackWidth * initialValue,
      y,
      12,
      0xffffff,
      1
    );
    handle.setStrokeStyle(2, 0x6c5ce7);

    // Volume text
    const volumeText = this.add.text(width / 2 + 160, y, `${Math.floor(initialValue * 100)}%`, {
      fontSize: '14px',
      color: COLORS.text
    }).setOrigin(0, 0.5);

    // Make handle draggable
    handle.setInteractive({ useHandCursor: true, draggable: true });

    this.input.on('drag', (pointer: Phaser.Input.Pointer, gameObject: Phaser.GameObjects.GameObject, dragX: number) => {
      if (gameObject !== handle) return;

      const minX = width / 2 + 50 - trackWidth / 2;
      const maxX = width / 2 + 50 + trackWidth / 2;
      const clampedX = Phaser.Math.Clamp(dragX, minX, maxX);

      handle.x = clampedX;
      const value = (clampedX - minX) / trackWidth;
      fill.width = trackWidth * value;
      volumeText.setText(`${Math.floor(value * 100)}%`);

      onChange(value);
    });
  }

  private createGameplaySettings(width: number, startY: number): void {
    // Section title
    this.add.text(width / 2, startY, '🎮 Gameplay', {
      fontSize: '22px',
      color: COLORS.warning,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Tutorial reset
    const tutorialBtn = this.add.rectangle(width / 2, startY + 50, 300, 40, 0x475569, 1);
    tutorialBtn.setStrokeStyle(2, 0x6c5ce7);

    const tutorialText = this.add.text(width / 2, startY + 50, '🔄 Reset Tutorial', {
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    tutorialBtn.setInteractive({ useHandCursor: true });
    tutorialBtn.on('pointerdown', () => {
      tutorialSystem.resetProgress();
      tutorialText.setText('✅ Tutorial Resetado!');
      this.time.delayedCall(2000, () => {
        tutorialText.setText('🔄 Reset Tutorial');
      });
    });

    tutorialBtn.on('pointerover', () => tutorialBtn.setFillStyle(0x5a6472));
    tutorialBtn.on('pointerout', () => tutorialBtn.setFillStyle(0x475569));

    // Skip all tutorials
    const skipBtn = this.add.rectangle(width / 2, startY + 110, 300, 40, 0xe74c3c, 1);
    skipBtn.setStrokeStyle(2, 0xff6b6b);

    const skipText = this.add.text(width / 2, startY + 110, '⏭️ Pular Todos Tutoriais', {
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    skipBtn.setInteractive({ useHandCursor: true });
    skipBtn.on('pointerdown', () => {
      tutorialSystem.skipAllTutorials();
      skipText.setText('✅ Tutoriais Pulados!');
      this.time.delayedCall(2000, () => {
        skipText.setText('⏭️ Pular Todos Tutoriais');
      });
    });

    skipBtn.on('pointerover', () => skipBtn.setFillStyle(0xff6b6b));
    skipBtn.on('pointerout', () => skipBtn.setFillStyle(0xe74c3c));
  }

  private createDataSettings(width: number, startY: number): void {
    // Section title
    this.add.text(width / 2, startY, '💾 Dados', {
      fontSize: '22px',
      color: COLORS.warning,
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Info text
    this.add.text(width / 2, startY + 40, 'Seu progresso é salvo automaticamente', {
      fontSize: '14px',
      color: COLORS.textMuted,
      align: 'center'
    }).setOrigin(0.5);

    // Version info
    this.add.text(width / 2, startY + 100, 'Market Research Quest v1.0.0', {
      fontSize: '12px',
      color: COLORS.textMuted,
      align: 'center'
    }).setOrigin(0.5);

    this.add.text(width / 2, startY + 120, 'Desenvolvido com 💜 por ROI Labs', {
      fontSize: '12px',
      color: COLORS.textMuted,
      align: 'center'
    }).setOrigin(0.5);
  }
}
