import Phaser from 'phaser'
import Player from '../objects/Player.js'
import InteractiveObject from '../objects/InteractiveObject.js'
import { scenarios } from '../data/scenarios.js'
import { t } from '../data/translations.js'

export default class ExecutiveFloorScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ExecutiveFloorScene' })
  }

  create() {
    // Create executive floor layout
    this.createExecutiveMap()

    // Create player
    this.player = new Player(this, 640, 720)

    // Create interactive objects
    this.interactiveObjects = this.add.group()
    this.createInteractiveObjects()

    // Setup collisions
    this.physics.add.collider(this.player, this.walls)

    // Setup keyboard
    this.cursors = this.input.keyboard.createCursorKeys()
    this.wasd = this.input.keyboard.addKeys({
      up: Phaser.Input.Keyboard.KeyCodes.W,
      down: Phaser.Input.Keyboard.KeyCodes.S,
      left: Phaser.Input.Keyboard.KeyCodes.A,
      right: Phaser.Input.Keyboard.KeyCodes.D,
    })
    this.interactKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.SPACE)
    this.interactKeyE = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.E)

    // HUD
    this.createHUD()

    // Current nearby object
    this.nearbyObject = null

    // Interaction prompt
    this.interactPrompt = this.add.text(0, 0, t('interactPrompt'), {
      font: '14px monospace',
      fill: '#ffd700',
      backgroundColor: '#000000aa',
      padding: { x: 8, y: 4 },
    })
    this.interactPrompt.setOrigin(0.5)
    this.interactPrompt.setVisible(false)
    this.interactPrompt.setDepth(100)

    // ESC key for pause
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)
    this.isPaused = false

    // Set physics world bounds
    this.physics.world.setBounds(0, 0, 1280, 960)

    // Camera follow
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
    this.cameras.main.setBounds(0, 0, 1280, 960)

    // Listen for scenario completion
    this.events.on('scenarioComplete', this.onScenarioComplete, this)

    // Track direction
    this.lastDirection = 'down'

    // Start background music
    const soundManager = this.registry.get('soundManager')
    if (soundManager) {
      soundManager.startMusic('break') // Warmer tone for executive area
    }
  }

  createExecutiveMap() {
    // Create base floor - warm executive colors
    const graphics = this.add.graphics()
    graphics.fillStyle(0x1a1510, 1)
    graphics.fillRect(0, 0, 1280, 960)

    // Add subtle carpet pattern
    graphics.lineStyle(1, 0x2a2520, 0.3)
    for (let x = 0; x < 1280; x += 48) {
      graphics.lineBetween(x, 0, x, 960)
    }
    for (let y = 0; y < 960; y += 48) {
      graphics.lineBetween(0, y, 1280, y)
    }

    // Executive Zones
    // Zone 1: CEO Office (top-left)
    graphics.fillStyle(0x2d2015, 0.8)
    graphics.fillRect(48, 48, 350, 280)
    graphics.lineStyle(2, 0xffd700, 0.5)
    graphics.strokeRect(48, 48, 350, 280)

    // Zone 2: Boardroom (top-right)
    graphics.fillStyle(0x15202d, 0.8)
    graphics.fillRect(880, 48, 352, 280)
    graphics.lineStyle(2, 0x9b59b6, 0.5)
    graphics.strokeRect(880, 48, 352, 280)

    // Zone 3: Executive Assistant Area (center)
    graphics.fillStyle(0x1d1d25, 0.6)
    graphics.fillRect(430, 350, 420, 200)
    graphics.lineStyle(2, 0x3498db, 0.5)
    graphics.strokeRect(430, 350, 420, 200)

    // Zone 4: VIP Reception (bottom)
    graphics.fillStyle(0x251d1d, 0.6)
    graphics.fillRect(400, 700, 480, 200)
    graphics.lineStyle(2, 0xe74c3c, 0.5)
    graphics.strokeRect(400, 700, 480, 200)

    // Zone labels
    const labelStyle = {
      font: 'bold 16px monospace',
      fill: '#ffd700',
      backgroundColor: '#000000aa',
      padding: { x: 8, y: 4 },
    }

    this.add.text(223, 56, t('ceoOffice') || 'CEO OFFICE', labelStyle).setOrigin(0.5, 0)
    this.add.text(1056, 56, t('boardroom') || 'BOARDROOM', { ...labelStyle, fill: '#9b59b6' }).setOrigin(0.5, 0)
    this.add.text(640, 358, t('executiveAssistant') || 'EXECUTIVE ASSISTANT', { ...labelStyle, fill: '#3498db' }).setOrigin(0.5, 0)
    this.add.text(640, 708, t('vipReception') || 'VIP RECEPTION', { ...labelStyle, fill: '#e74c3c' }).setOrigin(0.5, 0)

    // Add executive desks
    this.add.image(200, 200, 'desk').setScale(1.3)
    this.add.image(1056, 180, 'desk').setScale(1.8) // Boardroom table

    // Assistant desks
    for (let i = 0; i < 3; i++) {
      this.add.image(500 + i * 140, 450, 'desk')
    }

    // Create walls group
    this.walls = this.physics.add.staticGroup()

    // Outer walls
    for (let x = 0; x < 40; x++) {
      this.walls.create(x * 32 + 16, 16, 'wall')
      this.walls.create(x * 32 + 16, 29 * 32 + 16, 'wall')
    }
    for (let y = 1; y < 29; y++) {
      this.walls.create(16, y * 32 + 16, 'wall')
      this.walls.create(39 * 32 + 16, y * 32 + 16, 'wall')
    }

    // Add ambient effects
    this.createAmbientEffects()
  }

  createAmbientEffects() {
    // Warm ambient lighting
    const glowSpots = [
      { x: 200, y: 180, color: 0xffd700 },  // CEO office
      { x: 1056, y: 180, color: 0x9b59b6 }, // Boardroom
      { x: 640, y: 450, color: 0x3498db },  // Assistant area
      { x: 640, y: 800, color: 0xe74c3c },  // VIP reception
    ]

    glowSpots.forEach((spot) => {
      const glow = this.add.image(spot.x, spot.y, 'soft-glow')
      glow.setDepth(3)
      glow.setAlpha(0.2)
      glow.setScale(2)
      glow.setTint(spot.color)

      this.tweens.add({
        targets: glow,
        alpha: 0.35,
        scaleX: 2.3,
        scaleY: 2.3,
        duration: 3000,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      })
    })

    // Subtle particles
    this.add.particles(640, 400, 'particle', {
      x: { min: 50, max: 1230 },
      y: { min: 50, max: 900 },
      speed: { min: 3, max: 10 },
      scale: { start: 0.1, end: 0.03 },
      alpha: { start: 0.2, end: 0 },
      tint: 0xffd700,
      lifespan: 5000,
      frequency: 800,
      quantity: 1,
      blendMode: 'ADD',
    }).setDepth(50)
  }

  createInteractiveObjects() {
    const completedScenarios = this.registry.get('completedScenarios') || []

    // Executive Floor specific scenarios
    if (!completedScenarios.includes('exec-ceo-fraud-advanced')) {
      new InteractiveObject(this, 200, 200, 'computer', 'exec-ceo-fraud-advanced')
    }
    if (!completedScenarios.includes('exec-board-presentation')) {
      new InteractiveObject(this, 1056, 180, 'computer', 'exec-board-presentation')
    }
    if (!completedScenarios.includes('exec-assistant-request')) {
      new InteractiveObject(this, 500, 450, 'phone', 'exec-assistant-request')
    }
    if (!completedScenarios.includes('exec-merger-leak')) {
      new InteractiveObject(this, 640, 450, 'printer', 'exec-merger-leak')
    }
    if (!completedScenarios.includes('exec-competitor-spy')) {
      new InteractiveObject(this, 780, 450, 'computer', 'exec-competitor-spy')
    }
    if (!completedScenarios.includes('exec-vip-visitor')) {
      new InteractiveObject(this, 640, 800, 'door', 'exec-vip-visitor')
    }
  }

  createHUD() {
    const width = this.cameras.main.width

    this.hudContainer = this.add.container(0, 0)
    this.hudContainer.setScrollFactor(0)
    this.hudContainer.setDepth(200)

    const hudBg = this.add.rectangle(width / 2, 25, width, 50, 0x1a1510, 0.9)
    this.hudContainer.add(hudBg)

    this.scoreText = this.add.text(20, 15, `${t('score')}: ${this.registry.get('score') || 0}`, {
      font: '18px monospace',
      fill: '#ffd700',
    })
    this.hudContainer.add(this.scoreText)

    const levelScenarios = this.registry.get('levelScenarios') || 6
    const completed = (this.registry.get('completedScenarios') || []).filter(s => s.startsWith('exec-')).length
    this.progressText = this.add.text(width / 2, 15, `${t('progress')}: ${completed}/${levelScenarios}`, {
      font: '18px monospace',
      fill: '#9b59b6',
    })
    this.progressText.setOrigin(0.5, 0)
    this.hudContainer.add(this.progressText)

    // Level indicator
    this.add.text(width / 2, 35, 'EXECUTIVE FLOOR', {
      font: 'bold 12px monospace',
      fill: '#ffd700',
    }).setOrigin(0.5, 0).setScrollFactor(0).setDepth(200)

    // Pause button
    const pauseBtn = this.add.text(width - 25, 15, '||', {
      font: 'bold 20px monospace',
      fill: '#ffffff',
    })
    pauseBtn.setOrigin(0.5, 0)
    pauseBtn.setInteractive({ useHandCursor: true })
    pauseBtn.on('pointerdown', () => this.togglePause())
    this.hudContainer.add(pauseBtn)
  }

  togglePause() {
    if (this.isPaused) {
      this.resumeGame()
    } else {
      this.pauseGame()
    }
  }

  pauseGame() {
    this.isPaused = true
    this.physics.pause()

    this.pauseOverlay = this.add.container(0, 0)
    this.pauseOverlay.setScrollFactor(0)
    this.pauseOverlay.setDepth(300)

    const width = this.cameras.main.width
    const height = this.cameras.main.height

    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7)
    this.pauseOverlay.add(overlay)

    const menuBox = this.add.rectangle(width / 2, height / 2, 300, 280, 0x1a1510, 0.95)
    menuBox.setStrokeStyle(3, 0xffd700)
    this.pauseOverlay.add(menuBox)

    const pauseTitle = this.add.text(width / 2, height / 2 - 100, 'PAUSED', {
      font: 'bold 32px monospace',
      fill: '#ffd700',
    })
    pauseTitle.setOrigin(0.5)
    this.pauseOverlay.add(pauseTitle)

    const resumeBtn = this.createMenuButton(width / 2, height / 2 - 30, 'Resume', () => this.resumeGame())
    this.pauseOverlay.add(resumeBtn)

    const levelBtn = this.createMenuButton(width / 2, height / 2 + 30, 'Level Select', () => {
      this.resumeGame()
      this.scene.start('LevelSelectScene')
    })
    this.pauseOverlay.add(levelBtn)

    const menuBtn = this.createMenuButton(width / 2, height / 2 + 90, 'Main Menu', () => {
      this.resumeGame()
      this.scene.start('MenuScene')
    })
    this.pauseOverlay.add(menuBtn)
  }

  createMenuButton(x, y, text, callback) {
    const container = this.add.container(x, y)

    const bg = this.add.rectangle(0, 0, 200, 40, 0x9b59b6)
    bg.setInteractive({ useHandCursor: true })

    const label = this.add.text(0, 0, text, {
      font: 'bold 16px monospace',
      fill: '#ffffff',
    })
    label.setOrigin(0.5)

    bg.on('pointerover', () => {
      bg.setFillStyle(0x8e44ad)
      bg.setScale(1.05)
    })
    bg.on('pointerout', () => {
      bg.setFillStyle(0x9b59b6)
      bg.setScale(1)
    })
    bg.on('pointerdown', callback)

    container.add([bg, label])
    return container
  }

  resumeGame() {
    this.isPaused = false
    this.physics.resume()
    if (this.pauseOverlay) {
      this.pauseOverlay.destroy()
      this.pauseOverlay = null
    }
  }

  update() {
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.togglePause()
    }

    if (this.isPaused) return

    let velocityX = 0
    let velocityY = 0
    const speed = 200

    if (this.cursors.left.isDown || this.wasd.left.isDown) {
      velocityX = -speed
      this.lastDirection = 'left'
    } else if (this.cursors.right.isDown || this.wasd.right.isDown) {
      velocityX = speed
      this.lastDirection = 'right'
    }

    if (this.cursors.up.isDown || this.wasd.up.isDown) {
      velocityY = -speed
      this.lastDirection = 'up'
    } else if (this.cursors.down.isDown || this.wasd.down.isDown) {
      velocityY = speed
      this.lastDirection = 'down'
    }

    this.player.setVelocity(velocityX, velocityY)

    // Check for nearby interactive objects
    this.nearbyObject = null
    this.interactPrompt.setVisible(false)

    this.interactiveObjects.children.iterate((obj) => {
      if (obj && obj.active) {
        const distance = Phaser.Math.Distance.Between(
          this.player.x,
          this.player.y,
          obj.x,
          obj.y
        )
        if (distance < 60) {
          this.nearbyObject = obj
          this.interactPrompt.setPosition(obj.x, obj.y - 50)
          this.interactPrompt.setVisible(true)
          obj.showHighlight()
        } else {
          obj.hideHighlight()
        }
      }
    })

    // Handle interaction
    if (
      (Phaser.Input.Keyboard.JustDown(this.interactKey) ||
        Phaser.Input.Keyboard.JustDown(this.interactKeyE)) &&
      this.nearbyObject
    ) {
      this.startScenario(this.nearbyObject.scenarioId)
    }
  }

  startScenario(scenarioId) {
    const scenario = scenarios.find((s) => s.id === scenarioId)
    if (scenario) {
      this.scene.pause()
      this.scene.launch('ScenarioScene', { scenario, returnScene: 'ExecutiveFloorScene' })
    }
  }

  onScenarioComplete(data) {
    const { scenarioId, correct, points } = data

    const completed = this.registry.get('completedScenarios') || []
    if (!completed.includes(scenarioId)) {
      completed.push(scenarioId)
      this.registry.set('completedScenarios', completed)
    }

    if (correct) {
      const currentScore = this.registry.get('score') || 0
      this.registry.set('score', currentScore + points)
    }

    // Update HUD
    this.scoreText.setText(`${t('score')}: ${this.registry.get('score')}`)
    const levelScenarios = this.registry.get('levelScenarios') || 6
    const execCompleted = completed.filter(s => s.startsWith('exec-')).length
    this.progressText.setText(`${t('progress')}: ${execCompleted}/${levelScenarios}`)

    // Remove the completed object
    this.interactiveObjects.children.iterate((obj) => {
      if (obj && obj.scenarioId === scenarioId) {
        obj.destroy()
      }
    })

    // Check if all level scenarios completed
    if (execCompleted >= levelScenarios) {
      this.time.delayedCall(500, () => {
        this.scene.start('ResultsScene', { level: 3 })
      })
    }
  }
}
