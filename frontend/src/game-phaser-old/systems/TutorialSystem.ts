// ============= TUTORIAL SYSTEM =============
// Manages tutorial steps, hints, and first-time user experience

export interface TutorialStep {
  id: string;
  title: string;
  message: string;
  icon?: string;
  highlightElement?: string; // CSS selector or scene element ID
  position?: 'top' | 'bottom' | 'left' | 'right' | 'center';
  action?: 'click' | 'wait' | 'navigate' | 'complete-task';
  actionTarget?: string;
  nextStepDelay?: number; // Auto-advance after delay (ms)
  canSkip?: boolean;
}

export interface TutorialSequence {
  id: string;
  name: string;
  steps: TutorialStep[];
  triggerCondition?: string; // When to show this tutorial
  priority?: number;
}

export class TutorialSystem {
  private scene?: Phaser.Scene;
  private sequences: Map<string, TutorialSequence> = new Map();
  private completedSequences: Set<string> = new Set();
  private completedSteps: Set<string> = new Set();
  private currentSequence?: TutorialSequence;
  private currentStepIndex: number = -1;
  private enabled: boolean = true;
  private skipAll: boolean = false;

  // UI Elements
  private tutorialOverlay?: Phaser.GameObjects.Rectangle;
  private tutorialPanel?: Phaser.GameObjects.Container;
  private listeners: Array<(step: TutorialStep) => void> = [];

  constructor(scene?: Phaser.Scene) {
    this.scene = scene;
    this.loadProgress();
  }

  /**
   * Initialize tutorial system with sequences
   */
  public initialize(sequences: TutorialSequence[]): void {
    sequences.forEach(seq => {
      this.sequences.set(seq.id, seq);
    });
    console.log(`📚 Tutorial System initialized with ${sequences.length} sequences`);
  }

  /**
   * Start a tutorial sequence
   */
  public startSequence(sequenceId: string): boolean {
    if (this.skipAll || !this.enabled) return false;

    const sequence = this.sequences.get(sequenceId);
    if (!sequence) {
      console.warn(`Tutorial sequence ${sequenceId} not found`);
      return false;
    }

    if (this.completedSequences.has(sequenceId)) {
      console.log(`Tutorial sequence ${sequenceId} already completed`);
      return false;
    }

    this.currentSequence = sequence;
    this.currentStepIndex = 0;
    this.showStep(sequence.steps[0]);

    console.log(`📚 Starting tutorial: ${sequence.name}`);
    return true;
  }

  /**
   * Show a tutorial step
   */
  private showStep(step: TutorialStep): void {
    if (!this.scene || this.skipAll) return;

    // Notify listeners
    this.listeners.forEach(listener => listener(step));

    // Create tutorial UI
    this.createTutorialUI(step);

    console.log(`📚 Tutorial Step: ${step.title}`);
  }

  /**
   * Create tutorial UI overlay
   */
  private createTutorialUI(step: TutorialStep): void {
    if (!this.scene) return;

    // Clean up existing UI
    this.clearTutorialUI();

    const { width, height } = this.scene.cameras.main;

    // Semi-transparent overlay
    this.tutorialOverlay = this.scene.add.rectangle(0, 0, width, height, 0x000000, 0.7)
      .setOrigin(0)
      .setDepth(9998)
      .setInteractive();

    // Tutorial panel
    const panelWidth = Math.min(500, width - 40);
    const panelHeight = 220;

    let panelX = width / 2;
    let panelY = height / 2;

    // Position based on step position
    if (step.position === 'top') panelY = 150;
    else if (step.position === 'bottom') panelY = height - 150;
    else if (step.position === 'left') panelX = panelWidth / 2 + 40;
    else if (step.position === 'right') panelX = width - panelWidth / 2 - 40;

    this.tutorialPanel = this.scene.add.container(panelX, panelY).setDepth(9999);

    // Background
    const bg = this.scene.add.rectangle(0, 0, panelWidth, panelHeight, 0x2d2d44, 1);
    bg.setStrokeStyle(4, 0x6c5ce7);

    // Icon
    const icon = this.scene.add.text(-panelWidth / 2 + 30, -panelHeight / 2 + 30, step.icon || '💡', {
      fontSize: '32px'
    });

    // Title
    const title = this.scene.add.text(-panelWidth / 2 + 70, -panelHeight / 2 + 25, step.title, {
      fontSize: '20px',
      color: '#6c5ce7',
      fontStyle: 'bold',
      wordWrap: { width: panelWidth - 100 }
    });

    // Message
    const message = this.scene.add.text(0, -10, step.message, {
      fontSize: '15px',
      color: '#ffffff',
      align: 'center',
      wordWrap: { width: panelWidth - 60 }
    }).setOrigin(0.5);

    // Buttons
    const buttonY = panelHeight / 2 - 35;

    // Next button
    const nextBtn = this.scene.add.rectangle(100, buttonY, 120, 40, 0x6c5ce7, 1);
    nextBtn.setStrokeStyle(2, 0x8b7ce7);
    nextBtn.setInteractive({ useHandCursor: true });

    const nextText = this.scene.add.text(100, buttonY, 'Próximo', {
      fontSize: '16px',
      color: '#ffffff',
      fontStyle: 'bold'
    }).setOrigin(0.5);

    nextBtn.on('pointerdown', () => {
      this.nextStep();
    });

    nextBtn.on('pointerover', () => {
      nextBtn.setFillStyle(0x8b7ce7);
    });

    nextBtn.on('pointerout', () => {
      nextBtn.setFillStyle(0x6c5ce7);
    });

    // Skip button (if allowed)
    if (step.canSkip !== false) {
      const skipBtn = this.scene.add.text(-100, buttonY, 'Pular Tutorial', {
        fontSize: '14px',
        color: '#94a3b8'
      }).setOrigin(0.5);

      skipBtn.setInteractive({ useHandCursor: true });
      skipBtn.on('pointerdown', () => {
        this.skipSequence();
      });

      skipBtn.on('pointerover', () => {
        skipBtn.setColor('#ffffff');
      });

      skipBtn.on('pointerout', () => {
        skipBtn.setColor('#94a3b8');
      });

      this.tutorialPanel.add(skipBtn);
    }

    // Add all elements to container
    this.tutorialPanel.add([bg, icon, title, message, nextBtn, nextText]);

    // Fade in animation
    this.tutorialPanel.setAlpha(0);
    this.scene.tweens.add({
      targets: this.tutorialPanel,
      alpha: 1,
      duration: 300,
      ease: 'Cubic.easeOut'
    });

    // Auto-advance if specified
    if (step.nextStepDelay && step.nextStepDelay > 0) {
      this.scene.time.delayedCall(step.nextStepDelay, () => {
        this.nextStep();
      });
    }
  }

  /**
   * Clear tutorial UI
   */
  private clearTutorialUI(): void {
    if (this.tutorialOverlay) {
      this.tutorialOverlay.destroy();
      this.tutorialOverlay = undefined;
    }
    if (this.tutorialPanel) {
      this.tutorialPanel.destroy();
      this.tutorialPanel = undefined;
    }
  }

  /**
   * Advance to next step
   */
  public nextStep(): void {
    if (!this.currentSequence) return;

    // Mark current step as completed
    const currentStep = this.currentSequence.steps[this.currentStepIndex];
    if (currentStep) {
      this.completedSteps.add(currentStep.id);
    }

    this.currentStepIndex++;

    if (this.currentStepIndex >= this.currentSequence.steps.length) {
      // Sequence complete
      this.completeSequence();
    } else {
      // Show next step
      this.showStep(this.currentSequence.steps[this.currentStepIndex]);
    }
  }

  /**
   * Complete current sequence
   */
  private completeSequence(): void {
    if (!this.currentSequence) return;

    this.completedSequences.add(this.currentSequence.id);
    console.log(`📚 Tutorial sequence completed: ${this.currentSequence.name}`);

    this.clearTutorialUI();
    this.currentSequence = undefined;
    this.currentStepIndex = -1;

    this.saveProgress();
  }

  /**
   * Skip current sequence
   */
  public skipSequence(): void {
    if (!this.currentSequence) return;

    console.log(`📚 Tutorial sequence skipped: ${this.currentSequence.name}`);
    this.completeSequence();
  }

  /**
   * Skip all tutorials
   */
  public skipAllTutorials(): void {
    this.skipAll = true;
    this.skipSequence();
    this.saveProgress();
    console.log('📚 All tutorials skipped');
  }

  /**
   * Check if sequence is completed
   */
  public isSequenceCompleted(sequenceId: string): boolean {
    return this.completedSequences.has(sequenceId);
  }

  /**
   * Check if step is completed
   */
  public isStepCompleted(stepId: string): boolean {
    return this.completedSteps.has(stepId);
  }

  /**
   * Reset tutorial progress
   */
  public resetProgress(): void {
    this.completedSequences.clear();
    this.completedSteps.clear();
    this.skipAll = false;
    this.saveProgress();
    console.log('📚 Tutorial progress reset');
  }

  /**
   * Enable/disable tutorial system
   */
  public setEnabled(enabled: boolean): void {
    this.enabled = enabled;
    if (!enabled) {
      this.clearTutorialUI();
    }
  }

  /**
   * Add step completion listener
   */
  public onStepShow(callback: (step: TutorialStep) => void): void {
    this.listeners.push(callback);
  }

  /**
   * Show a contextual hint (tooltip)
   */
  public showHint(x: number, y: number, text: string, duration: number = 3000): void {
    if (!this.scene || this.skipAll) return;

    const hint = this.scene.add.container(x, y).setDepth(9999);

    const bg = this.scene.add.rectangle(0, 0, text.length * 8 + 40, 50, 0x2d2d44, 0.95);
    bg.setStrokeStyle(2, 0xfdcb6e);

    const icon = this.scene.add.text(-bg.width / 2 + 15, 0, '💡', {
      fontSize: '20px'
    }).setOrigin(0, 0.5);

    const message = this.scene.add.text(0, 0, text, {
      fontSize: '14px',
      color: '#ffffff'
    }).setOrigin(0.5);

    hint.add([bg, icon, message]);

    // Fade in
    hint.setAlpha(0);
    this.scene.tweens.add({
      targets: hint,
      alpha: 1,
      duration: 300,
      ease: 'Cubic.easeOut'
    });

    // Fade out and destroy
    this.scene.time.delayedCall(duration, () => {
      this.scene!.tweens.add({
        targets: hint,
        alpha: 0,
        duration: 300,
        ease: 'Cubic.easeIn',
        onComplete: () => hint.destroy()
      });
    });
  }

  /**
   * Save progress to localStorage
   */
  private saveProgress(): void {
    const data = {
      completedSequences: Array.from(this.completedSequences),
      completedSteps: Array.from(this.completedSteps),
      skipAll: this.skipAll
    };
    localStorage.setItem('tutorialProgress', JSON.stringify(data));
  }

  /**
   * Load progress from localStorage
   */
  private loadProgress(): void {
    const saved = localStorage.getItem('tutorialProgress');
    if (!saved) return;

    try {
      const data = JSON.parse(saved);
      this.completedSequences = new Set(data.completedSequences || []);
      this.completedSteps = new Set(data.completedSteps || []);
      this.skipAll = data.skipAll || false;
      console.log('📚 Loaded tutorial progress from save');
    } catch (error) {
      console.error('Failed to load tutorial progress:', error);
    }
  }
}

// Singleton instance
const tutorialSystem = new TutorialSystem();
export default tutorialSystem;

console.log('📚 Tutorial System loaded');
