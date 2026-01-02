import Phaser from 'phaser'
import { t, getCurrentLanguage } from '../data/translations.js'

export default class LevelSelectScene extends Phaser.Scene {
  constructor() {
    super({ key: 'LevelSelectScene' })
  }

  create() {
    this.sound = this.registry.get('soundManager')
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e)
    this.createBackgroundGrid()

    // Title
    const title = this.add.text(width / 2, 80, t('selectLevel') || 'SELECT LEVEL', {
      font: 'bold 42px monospace',
      fill: '#00ff88',
      stroke: '#003322',
      strokeThickness: 3,
    })
    title.setOrigin(0.5)

    // Get progress data
    const levelProgress = this.getLevelProgress()

    // Level definitions
    const levels = [
      {
        id: 1,
        name: t('level1Name') || 'Main Office',
        subtitle: t('level1Subtitle') || 'Beginner',
        description: t('level1Desc') || 'Learn the basics of cybersecurity',
        scenarios: 8,
        color: 0x27ae60,
        scene: 'OfficeScene',
        icon: '🏢',
      },
      {
        id: 2,
        name: t('level2Name') || 'Data Center',
        subtitle: t('level2Subtitle') || 'Intermediate',
        description: t('level2Desc') || 'Protect critical infrastructure',
        scenarios: 6,
        color: 0x3498db,
        scene: 'DataCenterScene',
        icon: '🖥️',
      },
      {
        id: 3,
        name: t('level3Name') || 'Executive Floor',
        subtitle: t('level3Subtitle') || 'Advanced',
        description: t('level3Desc') || 'Defend against targeted attacks',
        scenarios: 6,
        color: 0x9b59b6,
        scene: 'ExecutiveFloorScene',
        icon: '👔',
      },
    ]

    // Create level cards
    const cardWidth = 340
    const cardHeight = 400
    const startX = (width - (cardWidth * 3 + 60)) / 2 + cardWidth / 2
    const cardY = height / 2 + 30

    levels.forEach((level, index) => {
      const x = startX + index * (cardWidth + 30)
      const isUnlocked = levelProgress[level.id]?.unlocked ?? (level.id === 1)
      const completion = levelProgress[level.id]?.completion ?? 0
      const bestScore = levelProgress[level.id]?.bestScore ?? 0

      this.createLevelCard(x, cardY, level, isUnlocked, completion, bestScore, cardWidth, cardHeight)
    })

    // Back button
    const backBtn = this.add.rectangle(100, height - 50, 140, 40, 0x2c3e50)
    backBtn.setInteractive({ useHandCursor: true })

    const backText = this.add.text(100, height - 50, t('backToMenu') || '← Back', {
      font: 'bold 16px monospace',
      fill: '#ffffff',
    })
    backText.setOrigin(0.5)

    backBtn.on('pointerover', () => {
      backBtn.setFillStyle(0x34495e)
      if (this.sound) this.sound.playHover()
    })

    backBtn.on('pointerout', () => {
      backBtn.setFillStyle(0x2c3e50)
    })

    backBtn.on('pointerdown', () => {
      if (this.sound) this.sound.playClick()
      this.scene.start('MenuScene')
    })
  }

  createLevelCard(x, y, level, isUnlocked, completion, bestScore, cardWidth, cardHeight) {
    const container = this.add.container(x, y)

    // Card background
    const cardBg = this.add.rectangle(0, 0, cardWidth, cardHeight, isUnlocked ? 0x2c3e50 : 0x1c1c2e)
    cardBg.setStrokeStyle(3, isUnlocked ? level.color : 0x444444)
    container.add(cardBg)

    // Level number badge
    const badge = this.add.circle(-cardWidth / 2 + 40, -cardHeight / 2 + 40, 28, level.color)
    container.add(badge)

    const levelNum = this.add.text(-cardWidth / 2 + 40, -cardHeight / 2 + 40, `${level.id}`, {
      font: 'bold 24px monospace',
      fill: '#ffffff',
    })
    levelNum.setOrigin(0.5)
    container.add(levelNum)

    // Lock icon if locked
    if (!isUnlocked) {
      const lockIcon = this.add.text(0, -60, '🔒', {
        font: '64px sans-serif',
      })
      lockIcon.setOrigin(0.5)
      container.add(lockIcon)

      const lockText = this.add.text(0, 20, t('unlockRequirement') || 'Complete previous\nlevel with 70%+ score', {
        font: '14px monospace',
        fill: '#888888',
        align: 'center',
      })
      lockText.setOrigin(0.5)
      container.add(lockText)
    } else {
      // Icon
      const icon = this.add.text(0, -100, level.icon, {
        font: '48px sans-serif',
      })
      icon.setOrigin(0.5)
      container.add(icon)

      // Level name
      const name = this.add.text(0, -40, level.name, {
        font: 'bold 22px monospace',
        fill: '#ffffff',
      })
      name.setOrigin(0.5)
      container.add(name)

      // Subtitle (difficulty)
      const subtitle = this.add.text(0, -10, level.subtitle, {
        font: '14px monospace',
        fill: level.color === 0x27ae60 ? '#27ae60' : (level.color === 0x3498db ? '#3498db' : '#9b59b6'),
      })
      subtitle.setOrigin(0.5)
      container.add(subtitle)

      // Description
      const desc = this.add.text(0, 30, level.description, {
        font: '13px monospace',
        fill: '#aaaaaa',
        align: 'center',
        wordWrap: { width: cardWidth - 40 },
      })
      desc.setOrigin(0.5)
      container.add(desc)

      // Scenarios count
      const scenarioText = this.add.text(0, 80, `${level.scenarios} ${t('scenarios') || 'scenarios'}`, {
        font: '14px monospace',
        fill: '#888888',
      })
      scenarioText.setOrigin(0.5)
      container.add(scenarioText)

      // Progress bar
      if (completion > 0) {
        const barWidth = cardWidth - 60
        const barBg = this.add.rectangle(0, 120, barWidth, 12, 0x1a1a2e)
        container.add(barBg)

        const barFill = this.add.rectangle(
          -barWidth / 2 + (barWidth * completion) / 200,
          120,
          barWidth * completion / 100,
          12,
          level.color
        )
        container.add(barFill)

        const progressText = this.add.text(0, 120, `${Math.round(completion)}%`, {
          font: 'bold 10px monospace',
          fill: '#ffffff',
        })
        progressText.setOrigin(0.5)
        container.add(progressText)
      }

      // Best score
      if (bestScore > 0) {
        const scoreText = this.add.text(0, 150, `${t('bestScore') || 'Best'}: ${bestScore} pts`, {
          font: '14px monospace',
          fill: '#ffd700',
        })
        scoreText.setOrigin(0.5)
        container.add(scoreText)
      }

      // Make card interactive
      cardBg.setInteractive({ useHandCursor: true })

      cardBg.on('pointerover', () => {
        cardBg.setFillStyle(0x3c3c5e)
        container.setScale(1.02)
        if (this.sound) this.sound.playHover()
      })

      cardBg.on('pointerout', () => {
        cardBg.setFillStyle(0x2c3e50)
        container.setScale(1)
      })

      cardBg.on('pointerdown', () => {
        if (this.sound) this.sound.playClick()
        this.startLevel(level)
      })
    }

    return container
  }

  getLevelProgress() {
    const saved = localStorage.getItem('cybersafe-levels')
    if (saved) {
      return JSON.parse(saved)
    }
    // Default: only level 1 unlocked
    return {
      1: { unlocked: true, completion: 0, bestScore: 0 },
      2: { unlocked: false, completion: 0, bestScore: 0 },
      3: { unlocked: false, completion: 0, bestScore: 0 },
    }
  }

  startLevel(level) {
    // Store current level info
    this.registry.set('currentLevel', level.id)
    this.registry.set('levelScenarios', level.scenarios)
    this.registry.set('score', 0)
    this.registry.set('completedScenarios', [])

    // Check if story intro has been seen for this level
    const storyKey = `cybersafe-story-seen-${level.id}`
    const storySeen = localStorage.getItem(storyKey)

    if (!storySeen) {
      // Show story intro first
      localStorage.setItem(storyKey, 'true')
      this.scene.start('StoryScene', {
        level: level.id,
        isIntro: true,
        nextScene: level.scene,
      })
    } else {
      // Skip story, go directly to level
      this.scene.start(level.scene)
    }
  }

  createBackgroundGrid() {
    const graphics = this.add.graphics()
    graphics.lineStyle(1, 0x00ff88, 0.05)

    for (let x = 0; x < 1280; x += 40) {
      graphics.moveTo(x, 0)
      graphics.lineTo(x, 720)
    }

    for (let y = 0; y < 720; y += 40) {
      graphics.moveTo(0, y)
      graphics.lineTo(1280, y)
    }

    graphics.strokePath()
  }
}
