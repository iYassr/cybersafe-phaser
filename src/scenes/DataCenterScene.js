import Phaser from 'phaser'
import Player from '../objects/Player.js'
import InteractiveObject from '../objects/InteractiveObject.js'
import { scenarios } from '../data/scenarios.js'
import { t } from '../data/translations.js'

export default class DataCenterScene extends Phaser.Scene {
  constructor() {
    super({ key: 'DataCenterScene' })
  }

  create() {
    // Create data center layout
    this.createDataCenterMap()

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
      fill: '#00d4ff',
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
      soundManager.startMusic('server')
    }
  }

  createDataCenterMap() {
    // Create base floor - dark metallic
    const graphics = this.add.graphics()
    graphics.fillStyle(0x0a0a1a, 1)
    graphics.fillRect(0, 0, 1280, 960)

    // Add grid floor pattern
    graphics.lineStyle(1, 0x1a2a3a, 0.3)
    for (let x = 0; x < 1280; x += 64) {
      graphics.lineBetween(x, 0, x, 960)
    }
    for (let y = 0; y < 960; y += 64) {
      graphics.lineBetween(0, y, 1280, y)
    }

    // Server Room Zones
    // Zone 1: Main Server Hall (center)
    graphics.fillStyle(0x0d1a2d, 0.8)
    graphics.fillRect(200, 200, 880, 400)
    graphics.lineStyle(2, 0x00d4ff, 0.5)
    graphics.strokeRect(200, 200, 880, 400)

    // Zone 2: Cooling Area (left)
    graphics.fillStyle(0x0d2d1a, 0.6)
    graphics.fillRect(48, 200, 140, 400)
    graphics.lineStyle(2, 0x00ff88, 0.5)
    graphics.strokeRect(48, 200, 140, 400)

    // Zone 3: Network Operations (right)
    graphics.fillStyle(0x2d0d1a, 0.6)
    graphics.fillRect(1092, 200, 140, 400)
    graphics.lineStyle(2, 0xff4488, 0.5)
    graphics.strokeRect(1092, 200, 140, 400)

    // Zone 4: Security Station (bottom)
    graphics.fillStyle(0x1a1a0d, 0.6)
    graphics.fillRect(400, 700, 480, 200)
    graphics.lineStyle(2, 0xffaa00, 0.5)
    graphics.strokeRect(400, 700, 480, 200)

    // Zone labels
    const labelStyle = {
      font: 'bold 16px monospace',
      fill: '#00d4ff',
      backgroundColor: '#000000aa',
      padding: { x: 8, y: 4 },
    }

    this.add.text(640, 208, t('serverHall') || 'SERVER HALL', labelStyle).setOrigin(0.5, 0)
    this.add.text(118, 208, t('cooling') || 'COOLING', { ...labelStyle, fill: '#00ff88' }).setOrigin(0.5, 0)
    this.add.text(1162, 208, t('network') || 'NETWORK OPS', { ...labelStyle, fill: '#ff4488' }).setOrigin(0.5, 0)
    this.add.text(640, 708, t('securityStation') || 'SECURITY STATION', { ...labelStyle, fill: '#ffaa00' }).setOrigin(0.5, 0)

    // Add server rack visuals
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        const x = 280 + col * 130
        const y = 300 + row * 100
        this.add.image(x, y, 'server')
      }
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
    // Blinking server lights
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 6; col++) {
        const x = 280 + col * 130
        const y = 280 + row * 100

        for (let i = 0; i < 4; i++) {
          const light = this.add.circle(x - 20 + i * 12, y, 3, i % 2 === 0 ? 0x00ff88 : 0xff4444)
          light.setDepth(15)
          light.setAlpha(0.8)

          this.tweens.add({
            targets: light,
            alpha: 0.2,
            duration: 200 + Math.random() * 400,
            yoyo: true,
            repeat: -1,
            delay: Math.random() * 1000,
          })
        }
      }
    }

    // Cooling effect particles
    this.add.particles(100, 400, 'particle', {
      x: { min: 48, max: 188 },
      y: { min: 200, max: 600 },
      speed: { min: 10, max: 30 },
      scale: { start: 0.2, end: 0.05 },
      alpha: { start: 0.4, end: 0 },
      tint: 0x00ffff,
      lifespan: 2000,
      frequency: 200,
      quantity: 1,
      blendMode: 'ADD',
    }).setDepth(50)

    // Scan line effect
    const scanLines = this.add.graphics()
    scanLines.setDepth(100)
    scanLines.setAlpha(0.04)
    for (let y = 0; y < 960; y += 4) {
      scanLines.lineStyle(1, 0x00d4ff, 1)
      scanLines.lineBetween(0, y, 1280, y)
    }
    scanLines.setScrollFactor(0)
  }

  createInteractiveObjects() {
    const completedScenarios = this.registry.get('completedScenarios') || []

    // Data Center specific scenarios
    if (!completedScenarios.includes('dc-server-access')) {
      new InteractiveObject(this, 280, 300, 'server', 'dc-server-access')
    }
    if (!completedScenarios.includes('dc-backup-verify')) {
      new InteractiveObject(this, 410, 300, 'server', 'dc-backup-verify')
    }
    if (!completedScenarios.includes('dc-network-sniffing')) {
      new InteractiveObject(this, 1162, 350, 'computer', 'dc-network-sniffing')
    }
    if (!completedScenarios.includes('dc-cable-label')) {
      new InteractiveObject(this, 1162, 450, 'server', 'dc-cable-label')
    }
    if (!completedScenarios.includes('dc-visitor-escort')) {
      new InteractiveObject(this, 640, 800, 'door', 'dc-visitor-escort')
    }
    if (!completedScenarios.includes('dc-maintenance-window')) {
      new InteractiveObject(this, 540, 400, 'computer', 'dc-maintenance-window')
    }
  }

  createHUD() {
    const width = this.cameras.main.width

    this.hudContainer = this.add.container(0, 0)
    this.hudContainer.setScrollFactor(0)
    this.hudContainer.setDepth(200)

    const hudBg = this.add.rectangle(width / 2, 25, width, 50, 0x0a0a1a, 0.9)
    this.hudContainer.add(hudBg)

    this.scoreText = this.add.text(20, 15, `${t('score')}: ${this.registry.get('score') || 0}`, {
      font: '18px monospace',
      fill: '#00d4ff',
    })
    this.hudContainer.add(this.scoreText)

    const levelScenarios = this.registry.get('levelScenarios') || 6
    const completed = (this.registry.get('completedScenarios') || []).filter(s => s.startsWith('dc-')).length
    this.progressText = this.add.text(width / 2, 15, `${t('progress')}: ${completed}/${levelScenarios}`, {
      font: '18px monospace',
      fill: '#00ff88',
    })
    this.progressText.setOrigin(0.5, 0)
    this.hudContainer.add(this.progressText)

    // Level indicator
    this.add.text(width / 2, 35, 'DATA CENTER', {
      font: 'bold 12px monospace',
      fill: '#00d4ff',
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

    const menuBox = this.add.rectangle(width / 2, height / 2, 300, 280, 0x0a0a1a, 0.95)
    menuBox.setStrokeStyle(3, 0x00d4ff)
    this.pauseOverlay.add(menuBox)

    const pauseTitle = this.add.text(width / 2, height / 2 - 100, 'PAUSED', {
      font: 'bold 32px monospace',
      fill: '#00d4ff',
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

    const bg = this.add.rectangle(0, 0, 200, 40, 0x3498db)
    bg.setInteractive({ useHandCursor: true })

    const label = this.add.text(0, 0, text, {
      font: 'bold 16px monospace',
      fill: '#ffffff',
    })
    label.setOrigin(0.5)

    bg.on('pointerover', () => {
      bg.setFillStyle(0x2980b9)
      bg.setScale(1.05)
    })
    bg.on('pointerout', () => {
      bg.setFillStyle(0x3498db)
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
      this.scene.launch('ScenarioScene', { scenario, returnScene: 'DataCenterScene' })
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
    const dcCompleted = completed.filter(s => s.startsWith('dc-')).length
    this.progressText.setText(`${t('progress')}: ${dcCompleted}/${levelScenarios}`)

    // Remove the completed object
    this.interactiveObjects.children.iterate((obj) => {
      if (obj && obj.scenarioId === scenarioId) {
        obj.destroy()
      }
    })

    // Check if all level scenarios completed
    if (dcCompleted >= levelScenarios) {
      this.time.delayedCall(500, () => {
        this.scene.start('ResultsScene', { level: 2 })
      })
    }
  }
}
