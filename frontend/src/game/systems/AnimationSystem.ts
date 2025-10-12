// ============= ANIMATION SYSTEM =============
// Manages polished animations and visual effects for the game

export class AnimationSystem {
  private scene: Phaser.Scene;

  constructor(scene: Phaser.Scene) {
    this.scene = scene;
  }

  /**
   * Level up explosion with particles
   */
  public levelUpEffect(x: number, y: number): void {
    // Create star burst particles
    const particles = this.scene.add.particles(x, y, 'particle', {
      speed: { min: 100, max: 300 },
      scale: { start: 1.5, end: 0 },
      alpha: { start: 1, end: 0 },
      lifespan: 1000,
      frequency: -1,
      quantity: 30,
      tint: [0xfdcb6e, 0xffffff, 0x00b894]
    });

    // Add level up text
    const levelUpText = this.scene.add.text(x, y - 50, '⭐ LEVEL UP! ⭐', {
      fontSize: '32px',
      color: '#fdcb6e',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 6
    }).setOrigin(0.5);

    // Animate text
    this.scene.tweens.add({
      targets: levelUpText,
      y: y - 100,
      alpha: 0,
      scale: 1.5,
      duration: 2000,
      ease: 'Back.easeOut',
      onComplete: () => {
        levelUpText.destroy();
        particles.destroy();
      }
    });

    // Play explosion sound (placeholder)
    // this.scene.sound.play('levelup');
  }

  /**
   * Victory screen confetti effect
   */
  public victoryConfetti(width: number, height: number): void {
    const colors = [0xf59e0b, 0x00b894, 0x6c5ce7, 0xe74c3c, 0xfdcb6e];

    for (let i = 0; i < 50; i++) {
      const x = Math.random() * width;
      const y = -50;
      const confetti = this.scene.add.rectangle(x, y, 10, 10, colors[Math.floor(Math.random() * colors.length)]);

      this.scene.tweens.add({
        targets: confetti,
        y: height + 100,
        x: x + (Math.random() - 0.5) * 200,
        rotation: Math.random() * Math.PI * 4,
        duration: 2000 + Math.random() * 1000,
        delay: Math.random() * 500,
        ease: 'Cubic.easeIn',
        onComplete: () => confetti.destroy()
      });
    }
  }

  /**
   * Item get shine effect
   */
  public itemShineEffect(target: Phaser.GameObjects.GameObject): Phaser.Tweens.Tween {
    return this.scene.tweens.add({
      targets: target,
      alpha: 0.5,
      scale: 1.1,
      duration: 500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  /**
   * Coin collect animation
   */
  public coinCollectEffect(x: number, y: number, amount: number): void {
    const coinText = this.scene.add.text(x, y, `+${amount} 💰`, {
      fontSize: '24px',
      color: '#fdcb6e',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: coinText,
      y: y - 80,
      alpha: 0,
      duration: 1500,
      ease: 'Cubic.easeOut',
      onComplete: () => coinText.destroy()
    });

    // Play coin sound (placeholder)
    // this.scene.sound.play('coin');
  }

  /**
   * XP gain animation
   */
  public xpGainEffect(x: number, y: number, amount: number): void {
    const xpText = this.scene.add.text(x, y, `+${amount} XP`, {
      fontSize: '20px',
      color: '#6c5ce7',
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 4
    }).setOrigin(0.5);

    this.scene.tweens.add({
      targets: xpText,
      y: y - 60,
      alpha: 0,
      duration: 1200,
      ease: 'Cubic.easeOut',
      onComplete: () => xpText.destroy()
    });
  }

  /**
   * Damage number pop animation
   */
  public damagePopEffect(x: number, y: number, damage: number, isCritical: boolean = false): void {
    const color = isCritical ? '#e74c3c' : '#ffffff';
    const fontSize = isCritical ? '28px' : '22px';
    const text = isCritical ? `${damage} CRIT!` : `${damage}`;

    const damageText = this.scene.add.text(x, y, text, {
      fontSize: fontSize,
      color: color,
      fontStyle: 'bold',
      stroke: '#000000',
      strokeThickness: 5
    }).setOrigin(0.5);

    const targetY = y - (isCritical ? 70 : 50);
    const scale = isCritical ? 1.3 : 1;

    this.scene.tweens.add({
      targets: damageText,
      y: targetY,
      alpha: 0,
      scale: scale,
      duration: isCritical ? 1000 : 800,
      ease: 'Back.easeOut',
      onComplete: () => damageText.destroy()
    });

    if (isCritical) {
      // Add screen shake for critical hits
      this.scene.cameras.main.shake(200, 0.005);
    }
  }

  /**
   * Button hover pulse effect
   */
  public buttonHoverEffect(button: Phaser.GameObjects.GameObject): void {
    this.scene.tweens.add({
      targets: button,
      scale: 1.1,
      duration: 200,
      ease: 'Back.easeOut'
    });
  }

  /**
   * Button unhover effect
   */
  public buttonUnhoverEffect(button: Phaser.GameObjects.GameObject): void {
    this.scene.tweens.add({
      targets: button,
      scale: 1,
      duration: 200,
      ease: 'Back.easeIn'
    });
  }

  /**
   * Fade in transition
   */
  public fadeIn(duration: number = 500, color: number = 0x000000): void {
    this.scene.cameras.main.fadeIn(duration, 0, 0, 0);
  }

  /**
   * Fade out transition
   */
  public fadeOut(duration: number = 500, color: number = 0x000000): void {
    this.scene.cameras.main.fadeOut(duration, 0, 0, 0);
  }

  /**
   * Screen flash effect
   */
  public screenFlash(duration: number = 200, intensity: number = 0.8): void {
    this.scene.cameras.main.flash(duration, 255 * intensity, 255 * intensity, 255 * intensity);
  }

  /**
   * Screen shake effect
   */
  public screenShake(duration: number = 200, intensity: number = 0.005): void {
    this.scene.cameras.main.shake(duration, intensity);
  }

  /**
   * Pulse animation (for important UI elements)
   */
  public pulseEffect(target: Phaser.GameObjects.GameObject): Phaser.Tweens.Tween {
    return this.scene.tweens.add({
      targets: target,
      scale: 1.05,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  /**
   * Floating animation (for items, icons)
   */
  public floatEffect(target: Phaser.GameObjects.GameObject, amplitude: number = 10): Phaser.Tweens.Tween {
    const startY = (target as any).y;
    return this.scene.tweens.add({
      targets: target,
      y: startY - amplitude,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut'
    });
  }

  /**
   * Card flip animation
   */
  public cardFlipEffect(card: Phaser.GameObjects.GameObject, onFlip?: () => void): void {
    this.scene.tweens.add({
      targets: card,
      scaleX: 0,
      duration: 200,
      ease: 'Cubic.easeIn',
      onComplete: () => {
        if (onFlip) onFlip();
        this.scene.tweens.add({
          targets: card,
          scaleX: 1,
          duration: 200,
          ease: 'Cubic.easeOut'
        });
      }
    });
  }

  /**
   * Loot chest opening animation
   */
  public chestOpenEffect(x: number, y: number, onComplete?: () => void): void {
    const chest = this.scene.add.text(x, y, '📦', {
      fontSize: '64px'
    }).setOrigin(0.5);

    // Shake chest
    this.scene.tweens.add({
      targets: chest,
      angle: -10,
      duration: 100,
      yoyo: true,
      repeat: 5,
      onComplete: () => {
        // Change to open chest
        chest.setText('🎁');

        // Explosion effect
        this.screenFlash(300, 0.5);

        // Scale up and fade
        this.scene.tweens.add({
          targets: chest,
          scale: 1.5,
          alpha: 0,
          duration: 500,
          ease: 'Back.easeOut',
          onComplete: () => {
            chest.destroy();
            if (onComplete) onComplete();
          }
        });
      }
    });
  }

  /**
   * Quest complete banner animation
   */
  public questCompleteBanner(text: string): void {
    const { width, height } = this.scene.cameras.main;

    const banner = this.scene.add.rectangle(width / 2, -100, width, 80, 0x6c5ce7, 0.95).setOrigin(0.5);
    const bannerText = this.scene.add.text(width / 2, -100, `🎯 ${text}`, {
      fontSize: '24px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    // Slide in
    this.scene.tweens.add({
      targets: [banner, bannerText],
      y: 60,
      duration: 500,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Hold for 2 seconds
        this.scene.time.delayedCall(2000, () => {
          // Slide out
          this.scene.tweens.add({
            targets: [banner, bannerText],
            y: -100,
            duration: 500,
            ease: 'Back.easeIn',
            onComplete: () => {
              banner.destroy();
              bannerText.destroy();
            }
          });
        });
      }
    });
  }

  /**
   * Achievement unlock popup
   */
  public achievementUnlock(title: string, icon: string): void {
    const { width } = this.scene.cameras.main;

    const container = this.scene.add.container(width + 200, 100);

    const bg = this.scene.add.rectangle(0, 0, 350, 100, 0x2d2d44, 0.98);
    bg.setStrokeStyle(3, 0xfdcb6e);

    const iconText = this.scene.add.text(-140, 0, icon, {
      fontSize: '48px'
    }).setOrigin(0.5);

    const titleText = this.scene.add.text(-20, -15, 'Achievement Unlocked!', {
      fontSize: '14px',
      color: '#fdcb6e',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    const nameText = this.scene.add.text(-20, 10, title, {
      fontSize: '18px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0, 0.5);

    container.add([bg, iconText, titleText, nameText]);

    // Slide in from right
    this.scene.tweens.add({
      targets: container,
      x: width - 200,
      duration: 500,
      ease: 'Back.easeOut',
      onComplete: () => {
        // Hold for 3 seconds
        this.scene.time.delayedCall(3000, () => {
          // Slide out to right
          this.scene.tweens.add({
            targets: container,
            x: width + 200,
            duration: 500,
            ease: 'Back.easeIn',
            onComplete: () => container.destroy()
          });
        });
      }
    });

    // Play achievement sound (placeholder)
    // this.scene.sound.play('achievement');
  }

  /**
   * Typing text effect (for dialogues)
   */
  public typewriterEffect(
    textObject: Phaser.GameObjects.Text,
    fullText: string,
    speed: number = 50,
    onComplete?: () => void
  ): void {
    let currentChar = 0;
    textObject.setText('');

    const timer = this.scene.time.addEvent({
      delay: speed,
      callback: () => {
        if (currentChar < fullText.length) {
          textObject.setText(textObject.text + fullText[currentChar]);
          currentChar++;
          // Play typing sound (placeholder)
          // this.scene.sound.play('type', { volume: 0.1 });
        } else {
          timer.remove();
          if (onComplete) onComplete();
        }
      },
      loop: true
    });
  }
}

console.log('🎨 Animation System loaded');
