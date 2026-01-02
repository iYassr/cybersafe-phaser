import Phaser from 'phaser'
import { t, getCurrentLanguage, setCurrentLanguage, isRTL } from '../data/translations.js'
import SoundManager from '../utils/SoundManager.js'

export default class MenuScene extends Phaser.Scene {
  constructor() {
    super({ key: 'MenuScene' })
  }

  create() {
    // Initialize sound manager on first scene load
    if (!this.registry.get('soundManager')) {
      this.registry.set('soundManager', new SoundManager(this))
    }
    this.sound = this.registry.get('soundManager')
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e)

    // Animated background grid
    this.createBackgroundGrid()

    // Title
    const title = this.add.text(width / 2, 120, t('title'), {
      font: 'bold 64px monospace',
      fill: '#00ff88',
      stroke: '#003322',
      strokeThickness: 4,
    })
    title.setOrigin(0.5)

    const subtitle = this.add.text(width / 2, 185, t('subtitle'), {
      font: 'bold 42px monospace',
      fill: '#00d4ff',
    })
    subtitle.setOrigin(0.5)

    const tagline = this.add.text(width / 2, 240, t('tagline'), {
      font: '18px monospace',
      fill: '#ffffff',
    })
    tagline.setOrigin(0.5)

    // Instructions
    const instructionsText = t('instructions')
    const instructions = this.add.text(width / 2, 340, instructionsText, {
      font: '14px monospace',
      fill: '#aaaaaa',
      align: 'center',
      lineSpacing: 8,
    })
    instructions.setOrigin(0.5)

    // Language switcher
    const currentLang = getCurrentLanguage()
    const langText = currentLang === 'en' ? 'العربية' : 'English'

    const langButton = this.add.rectangle(width - 80, 40, 120, 35, 0x2c3e50)
    langButton.setInteractive({ useHandCursor: true })

    const langLabel = this.add.text(width - 80, 40, langText, {
      font: '16px monospace',
      fill: '#ffffff',
    })
    langLabel.setOrigin(0.5)

    langButton.on('pointerover', () => {
      langButton.setFillStyle(0x34495e)
      if (this.sound) this.sound.playHover()
    })

    langButton.on('pointerout', () => {
      langButton.setFillStyle(0x2c3e50)
    })

    langButton.on('pointerdown', () => {
      if (this.sound) this.sound.playClick()
      const newLang = getCurrentLanguage() === 'en' ? 'ar' : 'en'
      setCurrentLanguage(newLang)
      this.scene.restart()
    })

    // Start button
    const buttonBg = this.add.rectangle(width / 2, 480, 220, 55, 0x3498db)
    buttonBg.setInteractive({ useHandCursor: true })

    const startText = this.add.text(width / 2, 480, t('startButton'), {
      font: 'bold 18px monospace',
      fill: '#ffffff',
    })
    startText.setOrigin(0.5)

    // Button hover effects
    buttonBg.on('pointerover', () => {
      buttonBg.setFillStyle(0x2980b9)
      buttonBg.setScale(1.05)
      startText.setScale(1.05)
      if (this.sound) this.sound.playHover()
    })

    buttonBg.on('pointerout', () => {
      buttonBg.setFillStyle(0x3498db)
      buttonBg.setScale(1)
      startText.setScale(1)
    })

    buttonBg.on('pointerdown', () => {
      if (this.sound) this.sound.playClick()
      this.startGame()
    })

    // High score display
    const highScore = localStorage.getItem('cybersafe-highscore') || 0
    if (highScore > 0) {
      this.add.text(width / 2, 560, `${t('highScore')}: ${highScore}`, {
        font: '18px monospace',
        fill: '#ffd700',
      }).setOrigin(0.5)
    }

    // Version
    this.add.text(width - 10, height - 10, 'v1.0 | Phaser 3.90', {
      font: '12px monospace',
      fill: '#555555',
    }).setOrigin(1, 1)

    // Pulsing title animation
    this.tweens.add({
      targets: title,
      scaleX: 1.02,
      scaleY: 1.02,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    console.log('MenuScene created')
  }

  startGame() {
    console.log('Starting game...')
    this.registry.set('score', 0)
    this.registry.set('completedScenarios', [])
    this.scene.start('LevelSelectScene')
  }

  createBackgroundGrid() {
    const graphics = this.add.graphics()
    graphics.lineStyle(1, 0x00ff88, 0.1)

    // Vertical lines
    for (let x = 0; x < 1280; x += 40) {
      graphics.moveTo(x, 0)
      graphics.lineTo(x, 720)
    }

    // Horizontal lines
    for (let y = 0; y < 720; y += 40) {
      graphics.moveTo(0, y)
      graphics.lineTo(1280, y)
    }

    graphics.strokePath()
  }
}
