import Phaser from 'phaser'
import { t, getCurrentLanguage } from '../data/translations.js'

export default class StoryScene extends Phaser.Scene {
  constructor() {
    super({ key: 'StoryScene' })
  }

  init(data) {
    this.level = data.level || 1
    this.isIntro = data.isIntro !== false // Default to true for level intros
    this.nextScene = data.nextScene || 'OfficeScene'
  }

  create() {
    this.sound = this.registry.get('soundManager')
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Dark cinematic background
    this.add.rectangle(width / 2, height / 2, width, height, 0x0a0a15)

    // Get story content based on level and type
    const storyContent = this.getStoryContent()
    this.dialogueIndex = 0
    this.dialogues = storyContent.dialogues
    this.characterName = storyContent.character

    // Create character portrait area (left side)
    this.createCharacterPortrait(storyContent.characterColor)

    // Create dialogue box (right side)
    this.createDialogueBox()

    // Display first dialogue
    this.showDialogue()

    // Skip button
    const skipBtn = this.add.text(width - 100, 40, t('skip') || 'Skip >>', {
      font: '16px monospace',
      fill: '#888888',
    })
    skipBtn.setOrigin(1, 0.5)
    skipBtn.setInteractive({ useHandCursor: true })
    skipBtn.on('pointerover', () => skipBtn.setColor('#ffffff'))
    skipBtn.on('pointerout', () => skipBtn.setColor('#888888'))
    skipBtn.on('pointerdown', () => this.skipStory())

    // Click anywhere to advance
    this.input.on('pointerdown', () => {
      if (!this.isTyping) {
        this.advanceDialogue()
      } else {
        this.completeTyping()
      }
    })

    // Keyboard support
    this.input.keyboard.on('keydown-SPACE', () => {
      if (!this.isTyping) {
        this.advanceDialogue()
      } else {
        this.completeTyping()
      }
    })

    this.input.keyboard.on('keydown-ENTER', () => {
      if (!this.isTyping) {
        this.advanceDialogue()
      } else {
        this.completeTyping()
      }
    })

    this.input.keyboard.on('keydown-ESC', () => this.skipStory())
  }

  getStoryContent() {
    const stories = {
      1: {
        intro: {
          character: t('storyCharacterName') || 'Security Officer Chen',
          characterColor: 0x27ae60,
          dialogues: [
            t('story1Intro1') || "Welcome to Acme Corp! I'm Officer Chen, your Security Awareness Champion mentor.",
            t('story1Intro2') || "Today is your first day in the Main Office. You'll learn to spot common security threats.",
            t('story1Intro3') || "Remember: cybersecurity is everyone's responsibility. Stay vigilant!",
            t('story1Intro4') || "Explore the office and interact with glowing objects to handle security scenarios.",
          ],
        },
        outro: {
          character: t('storyCharacterName') || 'Security Officer Chen',
          characterColor: 0x27ae60,
          dialogues: [
            t('story1Outro1') || "Excellent work on your first day! You've shown great security awareness.",
            t('story1Outro2') || "But there's more to protect. Strange activity has been detected in the Data Center...",
          ],
        },
      },
      2: {
        intro: {
          character: t('storyCharacterName') || 'Security Officer Chen',
          characterColor: 0x3498db,
          dialogues: [
            t('story2Intro1') || "We've detected unusual network activity. The Data Center needs your attention.",
            t('story2Intro2') || "This area houses our critical infrastructure. The stakes are higher here.",
            t('story2Intro3') || "Physical security and access control are paramount. Trust but verify.",
          ],
        },
        outro: {
          character: t('storyCharacterName') || 'Security Officer Chen',
          characterColor: 0x3498db,
          dialogues: [
            t('story2Outro1') || "The infrastructure is secure. But our investigation revealed a deeper threat...",
            t('story2Outro2') || "Intelligence suggests our executives are being targeted. Head to the Executive Floor.",
          ],
        },
      },
      3: {
        intro: {
          character: t('storyCharacterName') || 'Security Officer Chen',
          characterColor: 0x9b59b6,
          dialogues: [
            t('story3Intro1') || "Welcome to the Executive Floor. This is where high-value targets work.",
            t('story3Intro2') || "Attackers specifically target executives with sophisticated social engineering.",
            t('story3Intro3') || "CEO fraud, corporate espionage, insider threats... You must be prepared for anything.",
          ],
        },
        outro: {
          character: t('storyCharacterName') || 'Security Officer Chen',
          characterColor: 0x9b59b6,
          dialogues: [
            t('story3Outro1') || "Outstanding! You've protected Acme Corp from top to bottom.",
            t('story3Outro2') || "You are now officially our Security Awareness Champion. The organization is safer because of you!",
            t('story3Outro3') || "Remember: security is a continuous journey, not a destination. Stay vigilant!",
          ],
        },
      },
    }

    const levelStory = stories[this.level] || stories[1]
    return this.isIntro ? levelStory.intro : levelStory.outro
  }

  createCharacterPortrait(color) {
    const x = 200
    const y = 360

    // Portrait frame
    const frame = this.add.rectangle(x, y, 280, 380, 0x1a1a2e)
    frame.setStrokeStyle(3, color)

    // Simple character silhouette (could be replaced with actual sprites)
    const head = this.add.circle(x, y - 80, 50, color)
    const body = this.add.rectangle(x, y + 40, 100, 140, color)
    body.setStrokeStyle(2, Phaser.Display.Color.GetColor32(255, 255, 255, 0.3))

    // Badge
    const badge = this.add.rectangle(x - 30, y + 10, 30, 40, 0xffd700)
    badge.setStrokeStyle(1, 0xffffff)

    // Animated glow
    const glow = this.add.image(x, y, 'soft-glow')
    glow.setScale(3)
    glow.setAlpha(0.2)
    glow.setTint(color)

    this.tweens.add({
      targets: glow,
      alpha: 0.4,
      scaleX: 3.3,
      scaleY: 3.3,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })
  }

  createDialogueBox() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Dialogue box background
    this.dialogueBg = this.add.rectangle(720, 360, 700, 400, 0x1a1a2e, 0.95)
    this.dialogueBg.setStrokeStyle(3, 0x00ff88)

    // Character name label
    this.nameLabel = this.add.text(400, 180, this.characterName, {
      font: 'bold 20px monospace',
      fill: '#00ff88',
      backgroundColor: '#0a0a15',
      padding: { x: 12, y: 6 },
    })

    // Dialogue text
    this.dialogueText = this.add.text(400, 280, '', {
      font: '18px monospace',
      fill: '#ffffff',
      wordWrap: { width: 640 },
      lineSpacing: 8,
    })

    // Continue prompt
    this.continuePrompt = this.add.text(1000, 520, t('clickToContinue') || 'Click to continue...', {
      font: '14px monospace',
      fill: '#888888',
    })
    this.continuePrompt.setOrigin(1, 0.5)
    this.continuePrompt.setVisible(false)

    // Blinking animation for continue prompt
    this.tweens.add({
      targets: this.continuePrompt,
      alpha: 0.5,
      duration: 500,
      yoyo: true,
      repeat: -1,
    })

    // Progress indicator
    this.progressText = this.add.text(720, 540, '', {
      font: '12px monospace',
      fill: '#555555',
    })
    this.progressText.setOrigin(0.5)
  }

  showDialogue() {
    if (this.dialogueIndex >= this.dialogues.length) {
      this.endStory()
      return
    }

    const dialogue = this.dialogues[this.dialogueIndex]
    this.typeText(dialogue)

    // Update progress
    this.progressText.setText(`${this.dialogueIndex + 1} / ${this.dialogues.length}`)
  }

  typeText(text) {
    this.isTyping = true
    this.currentText = text
    this.dialogueText.setText('')
    this.continuePrompt.setVisible(false)

    let charIndex = 0
    const typingSpeed = 30 // ms per character

    if (this.typingTimer) {
      this.typingTimer.remove()
    }

    this.typingTimer = this.time.addEvent({
      delay: typingSpeed,
      callback: () => {
        charIndex++
        this.dialogueText.setText(text.substring(0, charIndex))

        // Play subtle typing sound occasionally
        if (charIndex % 5 === 0 && this.sound) {
          // Could add a subtle click here
        }

        if (charIndex >= text.length) {
          this.isTyping = false
          this.continuePrompt.setVisible(true)
          this.typingTimer.remove()
        }
      },
      repeat: text.length - 1,
    })
  }

  completeTyping() {
    if (this.typingTimer) {
      this.typingTimer.remove()
    }
    this.dialogueText.setText(this.currentText)
    this.isTyping = false
    this.continuePrompt.setVisible(true)
  }

  advanceDialogue() {
    if (this.sound) this.sound.playClick()
    this.dialogueIndex++
    this.showDialogue()
  }

  skipStory() {
    if (this.sound) this.sound.playClick()
    this.endStory()
  }

  endStory() {
    // Fade out and transition
    this.cameras.main.fadeOut(500, 0, 0, 0)

    this.cameras.main.once('camerafadeoutcomplete', () => {
      if (this.isIntro) {
        // Go to the actual level
        this.scene.start(this.nextScene)
      } else {
        // After outro, go to level select or show results
        this.scene.start('LevelSelectScene')
      }
    })
  }
}
