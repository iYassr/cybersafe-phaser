import Phaser from 'phaser'
import Player from '../objects/Player.js'
import InteractiveObject from '../objects/InteractiveObject.js'
import { scenarios } from '../data/scenarios.js'
import { t } from '../data/translations.js'

export default class OfficeScene extends Phaser.Scene {
  constructor() {
    super({ key: 'OfficeScene' })
  }

  create() {
    // Create office layout
    this.createOfficeMap()

    // Create player (start near entrance)
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
      fill: '#00ff88',
      backgroundColor: '#000000aa',
      padding: { x: 8, y: 4 },
    })
    this.interactPrompt.setOrigin(0.5)
    this.interactPrompt.setVisible(false)
    this.interactPrompt.setDepth(100)

    // ESC key for pause
    this.escKey = this.input.keyboard.addKey(Phaser.Input.Keyboard.KeyCodes.ESC)

    // Pause state
    this.isPaused = false

    // Set physics world bounds to full map (1280x960)
    this.physics.world.setBounds(0, 0, 1280, 960)

    // Camera follow
    this.cameras.main.startFollow(this.player, true, 0.1, 0.1)
    this.cameras.main.setBounds(0, 0, 1280, 960)

    // Listen for scenario completion
    this.events.on('scenarioComplete', this.onScenarioComplete, this)

    // Track last direction for idle animation
    this.lastDirection = 'down'
  }

  createOfficeMap() {
    // Create base floor
    for (let x = 0; x < 40; x++) {
      for (let y = 0; y < 30; y++) {
        this.add.image(x * 32 + 16, y * 32 + 16, 'floor')
      }
    }

    // Create colored zone backgrounds for different areas
    const graphics = this.add.graphics()

    // Server Room zone (top-left) - dark blue tint
    graphics.fillStyle(0x1a3a5c, 0.3)
    graphics.fillRect(48, 48, 224, 192)

    // Break Room zone (top-right) - warm orange tint
    graphics.fillStyle(0x5c3a1a, 0.3)
    graphics.fillRect(1008, 48, 224, 192)

    // Meeting Room zone (bottom-right) - purple tint
    graphics.fillStyle(0x3a1a5c, 0.3)
    graphics.fillRect(1008, 640, 224, 272)

    // Reception zone (bottom-left) - green tint
    graphics.fillStyle(0x1a5c3a, 0.3)
    graphics.fillRect(48, 752, 320, 160)

    // Main Office zone (center) - subtle highlight
    graphics.fillStyle(0x2a2a4a, 0.2)
    graphics.fillRect(288, 256, 704, 368)

    // Draw zone borders
    graphics.lineStyle(2, 0x00ff88, 0.5)
    graphics.strokeRect(48, 48, 224, 192)      // Server room
    graphics.strokeRect(1008, 48, 224, 192)    // Break room
    graphics.strokeRect(1008, 640, 224, 272)   // Meeting room
    graphics.strokeRect(48, 752, 320, 160)     // Reception
    graphics.strokeRect(288, 256, 704, 368)    // Main office

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

    // Add room labels with better styling
    const labelStyle = {
      font: 'bold 16px monospace',
      fill: '#00ff88',
      backgroundColor: '#000000aa',
      padding: { x: 8, y: 4 },
    }

    this.add.text(160, 56, t('serverRoom'), labelStyle).setOrigin(0.5, 0)
    this.add.text(1120, 56, t('breakRoom'), labelStyle).setOrigin(0.5, 0)
    this.add.text(1120, 648, t('meetingRoom'), labelStyle).setOrigin(0.5, 0)
    this.add.text(640, 264, t('mainOffice'), { ...labelStyle, font: 'bold 20px monospace' }).setOrigin(0.5, 0)
    this.add.text(208, 760, t('reception'), labelStyle).setOrigin(0.5, 0)

    // Add aligned desks in the Main Office (4x3 grid, properly spaced)
    const deskStartX = 368
    const deskStartY = 336
    const deskSpacingX = 160
    const deskSpacingY = 96

    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const x = deskStartX + col * deskSpacingX
        const y = deskStartY + row * deskSpacingY
        this.add.image(x, y, 'desk')
      }
    }

    // Add meeting table in meeting room
    const meetingTable = this.add.image(1120, 776, 'desk')
    meetingTable.setScale(1.5)
    this.addShadow(1120, 796, 1.8)

    // Add break room table
    const breakTable = this.add.image(1120, 176, 'desk')
    breakTable.setScale(0.8)
    this.addShadow(1120, 192, 0.9)

    // Add shadows under desks
    for (let row = 0; row < 3; row++) {
      for (let col = 0; col < 4; col++) {
        const x = deskStartX + col * deskSpacingX
        const y = deskStartY + row * deskSpacingY
        this.addShadow(x, y + 16, 1.2)
      }
    }

    // Add ambient effects
    this.createAmbientEffects()
  }

  addShadow(x, y, scale = 1) {
    const shadow = this.add.image(x, y, 'shadow-large')
    shadow.setDepth(0)
    shadow.setAlpha(0.3)
    shadow.setScale(scale)
    return shadow
  }

  createAmbientEffects() {
    // Floating dust particles in the air
    this.dustParticles = this.add.particles(640, 400, 'particle', {
      x: { min: 50, max: 1230 },
      y: { min: 50, max: 900 },
      speed: { min: 5, max: 20 },
      scale: { start: 0.15, end: 0.05 },
      alpha: { start: 0.3, end: 0 },
      tint: 0xffffff,
      lifespan: 4000,
      frequency: 500,
      quantity: 1,
      blendMode: 'ADD',
    })
    this.dustParticles.setDepth(50)

    // Add blinking lights in server room area
    for (let i = 0; i < 3; i++) {
      const light = this.add.circle(80 + i * 30, 120 + i * 25, 3, 0x00ff88)
      light.setDepth(15)
      light.setAlpha(0.8)

      this.tweens.add({
        targets: light,
        alpha: 0.2,
        duration: 300 + i * 200,
        yoyo: true,
        repeat: -1,
        delay: i * 400,
      })
    }

    // Add subtle scan line effect overlay
    const scanLines = this.add.graphics()
    scanLines.setDepth(100)
    scanLines.setAlpha(0.03)
    for (let y = 0; y < 960; y += 4) {
      scanLines.lineStyle(1, 0x000000, 1)
      scanLines.lineBetween(0, y, 1280, y)
    }
    scanLines.setScrollFactor(0)

    // Animated glow spots in corners
    const glowSpots = [
      { x: 160, y: 144, color: 0x00ff88 },  // Server room
      { x: 1120, y: 144, color: 0xff8800 }, // Break room
      { x: 1120, y: 776, color: 0x8800ff }, // Meeting room
      { x: 208, y: 832, color: 0x00ff88 },  // Reception
    ]

    glowSpots.forEach((spot, i) => {
      const glow = this.add.image(spot.x, spot.y, 'soft-glow')
      glow.setDepth(3)
      glow.setAlpha(0.15)
      glow.setScale(1.5)
      glow.setTint(spot.color)

      this.tweens.add({
        targets: glow,
        alpha: 0.3,
        scaleX: 1.8,
        scaleY: 1.8,
        duration: 2000 + i * 500,
        yoyo: true,
        repeat: -1,
        ease: 'Sine.easeInOut',
      })
    })
  }

  createInteractiveObjects() {
    const completedScenarios = this.registry.get('completedScenarios') || []

    // === MAIN OFFICE ZONE (4 workstations aligned with desks) ===
    // Row 1 workstations - aligned at y=320 (above desks at y=336)
    if (!completedScenarios.includes('phishing-email')) {
      new InteractiveObject(this, 368, 320, 'computer', 'phishing-email')
    }
    if (!completedScenarios.includes('invoice-malware')) {
      new InteractiveObject(this, 528, 320, 'computer', 'invoice-malware')
    }
    if (!completedScenarios.includes('ceo-fraud')) {
      new InteractiveObject(this, 688, 320, 'computer', 'ceo-fraud')
    }
    if (!completedScenarios.includes('software-download')) {
      new InteractiveObject(this, 848, 320, 'computer', 'software-download')
    }

    // Phone in main office (near a desk)
    if (!completedScenarios.includes('vendor-call')) {
      new InteractiveObject(this, 368, 416, 'phone', 'vendor-call')
    }

    // Printer in main office (side area)
    if (!completedScenarios.includes('clean-desk')) {
      new InteractiveObject(this, 848, 528, 'printer', 'clean-desk')
    }

    // === SERVER ROOM ZONE (top-left) ===
    if (!completedScenarios.includes('server-access')) {
      new InteractiveObject(this, 160, 144, 'server', 'server-access')
    }

    // === BREAK ROOM ZONE (top-right) ===
    if (!completedScenarios.includes('public-wifi')) {
      new InteractiveObject(this, 1072, 144, 'coffee', 'public-wifi')
    }
    if (!completedScenarios.includes('shoulder-surfing')) {
      new InteractiveObject(this, 1168, 144, 'computer', 'shoulder-surfing')
    }

    // === MEETING ROOM ZONE (bottom-right) ===
    // No specific scenarios here, but the zone exists

    // === RECEPTION ZONE (bottom-left) ===
    if (!completedScenarios.includes('tech-support-scam')) {
      new InteractiveObject(this, 160, 832, 'phone', 'tech-support-scam')
    }

    // === ENTRANCE AREA (bottom center) ===
    if (!completedScenarios.includes('usb-drive')) {
      new InteractiveObject(this, 640, 864, 'usb', 'usb-drive')
    }
    if (!completedScenarios.includes('tailgating')) {
      new InteractiveObject(this, 640, 912, 'door', 'tailgating')
    }
  }

  createHUD() {
    const width = this.cameras.main.width

    // Fixed HUD container
    this.hudContainer = this.add.container(0, 0)
    this.hudContainer.setScrollFactor(0)
    this.hudContainer.setDepth(200)

    // Background
    const hudBg = this.add.rectangle(width / 2, 25, width, 50, 0x1a1a2e, 0.9)
    this.hudContainer.add(hudBg)

    // Score
    this.scoreText = this.add.text(20, 15, `${t('score')}: 0`, {
      font: '18px monospace',
      fill: '#00ff88',
    })
    this.hudContainer.add(this.scoreText)

    // Progress
    const total = this.registry.get('totalScenarios')
    const completed = (this.registry.get('completedScenarios') || []).length
    this.progressText = this.add.text(width / 2, 15, `${t('progress')}: ${completed}/${total}`, {
      font: '18px monospace',
      fill: '#00d4ff',
    })
    this.progressText.setOrigin(0.5, 0)
    this.hudContainer.add(this.progressText)

    // Instructions
    this.hintText = this.add.text(width - 180, 15, t('hint'), {
      font: '14px monospace',
      fill: '#aaaaaa',
    })
    this.hintText.setOrigin(1, 0)
    this.hudContainer.add(this.hintText)

    // Create mini-map
    this.createMiniMap()

    // Pause button
    const pauseBtn = this.add.text(width - 25, 15, '⏸', {
      font: '24px Arial',
      fill: '#ffffff',
    })
    pauseBtn.setOrigin(0.5, 0)
    pauseBtn.setInteractive({ useHandCursor: true })
    pauseBtn.on('pointerdown', () => this.togglePause())
    this.hudContainer.add(pauseBtn)
  }

  createMiniMap() {
    const mapWidth = 160
    const mapHeight = 120
    const mapX = this.cameras.main.width - mapWidth - 10
    const mapY = this.cameras.main.height - mapHeight - 10

    // Mini-map container
    this.miniMapContainer = this.add.container(mapX, mapY)
    this.miniMapContainer.setScrollFactor(0)
    this.miniMapContainer.setDepth(200)

    // Background
    const mapBg = this.add.rectangle(mapWidth / 2, mapHeight / 2, mapWidth, mapHeight, 0x1a1a2e, 0.85)
    mapBg.setStrokeStyle(2, 0x00ff88)
    this.miniMapContainer.add(mapBg)

    // Scale factor for mini-map (1280x960 -> 160x120)
    const scaleX = mapWidth / 1280
    const scaleY = mapHeight / 960

    // Draw room zones on mini-map
    const miniGraphics = this.add.graphics()

    // Server room (blue)
    miniGraphics.fillStyle(0x1a3a5c, 0.6)
    miniGraphics.fillRect(mapX + 48 * scaleX, mapY + 48 * scaleY, 224 * scaleX, 192 * scaleY)

    // Break room (orange)
    miniGraphics.fillStyle(0x5c3a1a, 0.6)
    miniGraphics.fillRect(mapX + 1008 * scaleX, mapY + 48 * scaleY, 224 * scaleX, 192 * scaleY)

    // Meeting room (purple)
    miniGraphics.fillStyle(0x3a1a5c, 0.6)
    miniGraphics.fillRect(mapX + 1008 * scaleX, mapY + 640 * scaleY, 224 * scaleX, 272 * scaleY)

    // Reception (green)
    miniGraphics.fillStyle(0x1a5c3a, 0.6)
    miniGraphics.fillRect(mapX + 48 * scaleX, mapY + 752 * scaleY, 320 * scaleX, 160 * scaleY)

    // Main office (subtle)
    miniGraphics.fillStyle(0x2a2a4a, 0.4)
    miniGraphics.fillRect(mapX + 288 * scaleX, mapY + 256 * scaleY, 704 * scaleX, 368 * scaleY)

    miniGraphics.setScrollFactor(0)
    miniGraphics.setDepth(199)

    // Player dot on mini-map
    this.miniMapPlayer = this.add.circle(mapWidth / 2, mapHeight / 2, 4, 0x00ff88)
    this.miniMapPlayer.setStrokeStyle(1, 0xffffff)
    this.miniMapContainer.add(this.miniMapPlayer)

    // Interactive object dots
    this.miniMapDots = []
    const completedScenarios = this.registry.get('completedScenarios') || []

    const objectPositions = [
      { x: 368, y: 320, completed: completedScenarios.includes('phishing-email') },
      { x: 528, y: 320, completed: completedScenarios.includes('invoice-malware') },
      { x: 688, y: 320, completed: completedScenarios.includes('ceo-fraud') },
      { x: 848, y: 320, completed: completedScenarios.includes('software-download') },
      { x: 368, y: 416, completed: completedScenarios.includes('vendor-call') },
      { x: 848, y: 528, completed: completedScenarios.includes('clean-desk') },
      { x: 160, y: 144, completed: completedScenarios.includes('server-access') },
      { x: 1072, y: 144, completed: completedScenarios.includes('public-wifi') },
      { x: 1168, y: 144, completed: completedScenarios.includes('shoulder-surfing') },
      { x: 160, y: 832, completed: completedScenarios.includes('tech-support-scam') },
      { x: 640, y: 864, completed: completedScenarios.includes('usb-drive') },
      { x: 640, y: 912, completed: completedScenarios.includes('tailgating') },
    ]

    objectPositions.forEach(pos => {
      if (!pos.completed) {
        const dot = this.add.circle(pos.x * scaleX, pos.y * scaleY, 2, 0xffd700)
        this.miniMapContainer.add(dot)
        this.miniMapDots.push(dot)
      }
    })

    // Mini-map label
    const mapLabel = this.add.text(mapWidth / 2, 8, 'MAP', {
      font: 'bold 10px monospace',
      fill: '#00ff88',
    })
    mapLabel.setOrigin(0.5, 0)
    this.miniMapContainer.add(mapLabel)

    // Store scale for update
    this.miniMapScaleX = scaleX
    this.miniMapScaleY = scaleY
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

    // Create pause overlay
    this.pauseOverlay = this.add.container(0, 0)
    this.pauseOverlay.setScrollFactor(0)
    this.pauseOverlay.setDepth(300)

    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Dark overlay
    const overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0.7)
    this.pauseOverlay.add(overlay)

    // Pause menu box
    const menuBox = this.add.rectangle(width / 2, height / 2, 300, 280, 0x1a1a2e, 0.95)
    menuBox.setStrokeStyle(3, 0x00ff88)
    this.pauseOverlay.add(menuBox)

    // Pause title
    const pauseTitle = this.add.text(width / 2, height / 2 - 100, 'PAUSED', {
      font: 'bold 32px monospace',
      fill: '#00ff88',
    })
    pauseTitle.setOrigin(0.5)
    this.pauseOverlay.add(pauseTitle)

    // Resume button
    const resumeBtn = this.createMenuButton(width / 2, height / 2 - 30, 'Resume', () => this.resumeGame())
    this.pauseOverlay.add(resumeBtn)

    // Restart button
    const restartBtn = this.createMenuButton(width / 2, height / 2 + 30, 'Restart', () => {
      this.resumeGame()
      this.registry.set('score', 0)
      this.registry.set('completedScenarios', [])
      this.scene.restart()
    })
    this.pauseOverlay.add(restartBtn)

    // Menu button
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
    // Check for pause toggle
    if (Phaser.Input.Keyboard.JustDown(this.escKey)) {
      this.togglePause()
    }

    // Don't process input if paused
    if (this.isPaused) return

    // Handle player movement
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

    // Update mini-map player position
    if (this.miniMapPlayer && this.miniMapScaleX) {
      this.miniMapPlayer.setPosition(
        this.player.x * this.miniMapScaleX,
        this.player.y * this.miniMapScaleY
      )
    }

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
      this.scene.launch('ScenarioScene', { scenario, returnScene: 'OfficeScene' })
    }
  }

  onScenarioComplete(data) {
    const { scenarioId, correct, points } = data

    // Update completed scenarios
    const completed = this.registry.get('completedScenarios') || []
    if (!completed.includes(scenarioId)) {
      completed.push(scenarioId)
      this.registry.set('completedScenarios', completed)
    }

    // Update score
    if (correct) {
      const currentScore = this.registry.get('score') || 0
      this.registry.set('score', currentScore + points)
    }

    // Update HUD
    this.scoreText.setText(`${t('score')}: ${this.registry.get('score')}`)
    this.progressText.setText(`${t('progress')}: ${completed.length}/${this.registry.get('totalScenarios')}`)

    // Remove the completed object
    this.interactiveObjects.children.iterate((obj) => {
      if (obj && obj.scenarioId === scenarioId) {
        obj.destroy()
      }
    })

    // Check if all scenarios completed
    if (completed.length >= this.registry.get('totalScenarios')) {
      this.time.delayedCall(500, () => {
        this.scene.start('ResultsScene')
      })
    }
  }
}
