import Phaser from 'phaser'

export default class BootScene extends Phaser.Scene {
  constructor() {
    super({ key: 'BootScene' })
  }

  preload() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Stylish loading screen
    this.cameras.main.setBackgroundColor(0x0a0a1a)

    const progressBox = this.add.graphics()
    progressBox.fillStyle(0x1a1a2e, 1)
    progressBox.fillRoundedRect(width / 2 - 170, height / 2 - 30, 340, 60, 10)
    progressBox.lineStyle(2, 0x00ff88, 1)
    progressBox.strokeRoundedRect(width / 2 - 170, height / 2 - 30, 340, 60, 10)

    const progressBar = this.add.graphics()

    const loadingText = this.add.text(width / 2, height / 2 - 70, 'CYBERSAFE OFFICE', {
      font: 'bold 28px monospace',
      fill: '#00ff88',
    })
    loadingText.setOrigin(0.5)

    const percentText = this.add.text(width / 2, height / 2, '0%', {
      font: 'bold 20px monospace',
      fill: '#ffffff',
    })
    percentText.setOrigin(0.5)

    const tipText = this.add.text(width / 2, height / 2 + 60, 'Loading security training...', {
      font: '14px monospace',
      fill: '#666666',
    })
    tipText.setOrigin(0.5)

    this.load.on('progress', (value) => {
      percentText.setText(parseInt(value * 100) + '%')
      progressBar.clear()
      progressBar.fillStyle(0x00ff88, 1)
      progressBar.fillRoundedRect(width / 2 - 160, height / 2 - 20, 320 * value, 40, 8)
    })

    this.load.on('complete', () => {
      progressBar.destroy()
      progressBox.destroy()
      loadingText.destroy()
      percentText.destroy()
      tipText.destroy()
    })

    this.createPlaceholderAssets()
  }

  createPlaceholderAssets() {
    // ========== IMPROVED PLAYER CHARACTER ==========
    const playerGraphics = this.make.graphics({ x: 0, y: 0, add: false })

    // Shadow
    playerGraphics.fillStyle(0x000000, 0.2)
    playerGraphics.fillEllipse(16, 30, 20, 8)

    // Legs
    playerGraphics.fillStyle(0x2c3e50, 1)
    playerGraphics.fillRoundedRect(10, 22, 5, 8, 2)
    playerGraphics.fillRoundedRect(17, 22, 5, 8, 2)

    // Body - gradient effect with layers
    playerGraphics.fillStyle(0x2980b9, 1)
    playerGraphics.fillRoundedRect(8, 12, 16, 12, 3)
    playerGraphics.fillStyle(0x3498db, 1)
    playerGraphics.fillRoundedRect(9, 13, 14, 10, 2)

    // ID Badge
    playerGraphics.fillStyle(0xffffff, 1)
    playerGraphics.fillRect(18, 14, 4, 5)
    playerGraphics.fillStyle(0x00ff88, 1)
    playerGraphics.fillRect(19, 15, 2, 2)

    // Head
    playerGraphics.fillStyle(0xf5d0a9, 1)
    playerGraphics.fillCircle(16, 9, 7)

    // Hair
    playerGraphics.fillStyle(0x4a3728, 1)
    playerGraphics.fillEllipse(16, 5, 8, 5)
    playerGraphics.fillCircle(11, 7, 3)
    playerGraphics.fillCircle(21, 7, 3)

    // Face
    playerGraphics.fillStyle(0x2c3e50, 1)
    playerGraphics.fillCircle(13, 8, 1) // Left eye
    playerGraphics.fillCircle(19, 8, 1) // Right eye
    playerGraphics.fillStyle(0xe74c3c, 0.5)
    playerGraphics.fillEllipse(16, 12, 3, 1) // Smile

    playerGraphics.generateTexture('player', 32, 32)

    // ========== IMPROVED FLOOR ==========
    const floorGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    floorGraphics.fillStyle(0x8e9eab, 1)
    floorGraphics.fillRect(0, 0, 32, 32)
    floorGraphics.fillStyle(0x9aabb8, 1)
    floorGraphics.fillRect(1, 1, 30, 30)
    floorGraphics.lineStyle(1, 0x7f8c8d, 0.3)
    floorGraphics.strokeRect(0, 0, 32, 32)
    // Floor shine
    floorGraphics.fillStyle(0xffffff, 0.05)
    floorGraphics.fillRect(2, 2, 12, 12)
    floorGraphics.generateTexture('floor', 32, 32)

    // ========== IMPROVED WALL ==========
    const wallGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Wall base
    wallGraphics.fillStyle(0x34495e, 1)
    wallGraphics.fillRect(0, 0, 32, 32)
    // Wall detail
    wallGraphics.fillStyle(0x2c3e50, 1)
    wallGraphics.fillRect(0, 26, 32, 6)
    // Wall highlight
    wallGraphics.fillStyle(0x4a6785, 1)
    wallGraphics.fillRect(0, 0, 32, 2)
    wallGraphics.generateTexture('wall', 32, 32)

    // ========== IMPROVED DESK ==========
    const deskGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Desk shadow
    deskGraphics.fillStyle(0x000000, 0.2)
    deskGraphics.fillEllipse(32, 30, 60, 8)
    // Desk surface
    deskGraphics.fillStyle(0x6b4423, 1)
    deskGraphics.fillRoundedRect(2, 4, 60, 20, 3)
    // Desk top highlight
    deskGraphics.fillStyle(0x8b5a2b, 1)
    deskGraphics.fillRoundedRect(4, 6, 56, 8, 2)
    // Desk front
    deskGraphics.fillStyle(0x5d3a1a, 1)
    deskGraphics.fillRoundedRect(2, 20, 60, 8, { tl: 0, tr: 0, bl: 3, br: 3 })
    deskGraphics.generateTexture('desk', 64, 32)

    // ========== IMPROVED COMPUTER ==========
    const computerGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Monitor back
    computerGraphics.fillStyle(0x1a1a2e, 1)
    computerGraphics.fillRoundedRect(4, 2, 24, 18, 2)
    // Screen bezel
    computerGraphics.fillStyle(0x2c3e50, 1)
    computerGraphics.fillRoundedRect(5, 3, 22, 16, 2)
    // Screen
    const screenGradient = computerGraphics.fillStyle(0x00d4ff, 1)
    computerGraphics.fillRoundedRect(7, 5, 18, 12, 1)
    // Screen glow
    computerGraphics.fillStyle(0x00ff88, 0.3)
    computerGraphics.fillRect(8, 6, 8, 4)
    // Screen lines (code effect)
    computerGraphics.fillStyle(0x00ff88, 0.5)
    computerGraphics.fillRect(9, 11, 10, 1)
    computerGraphics.fillRect(9, 13, 6, 1)
    // Stand
    computerGraphics.fillStyle(0x1a1a2e, 1)
    computerGraphics.fillRect(13, 20, 6, 4)
    // Base
    computerGraphics.fillStyle(0x2c3e50, 1)
    computerGraphics.fillRoundedRect(9, 24, 14, 4, 2)
    // Power LED
    computerGraphics.fillStyle(0x00ff88, 1)
    computerGraphics.fillCircle(26, 17, 1)
    computerGraphics.generateTexture('computer', 32, 32)

    // ========== IMPROVED PHONE ==========
    const phoneGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Phone body
    phoneGraphics.fillStyle(0x1a1a2e, 1)
    phoneGraphics.fillRoundedRect(8, 4, 16, 24, 3)
    // Phone bezel
    phoneGraphics.fillStyle(0x2c3e50, 1)
    phoneGraphics.fillRoundedRect(9, 5, 14, 22, 2)
    // Screen
    phoneGraphics.fillStyle(0x00d4ff, 1)
    phoneGraphics.fillRoundedRect(10, 7, 12, 14, 1)
    // Screen content
    phoneGraphics.fillStyle(0xffffff, 0.8)
    phoneGraphics.fillRect(12, 9, 8, 2)
    phoneGraphics.fillRect(12, 13, 6, 1)
    phoneGraphics.fillRect(12, 16, 7, 1)
    // Home button
    phoneGraphics.fillStyle(0x3498db, 1)
    phoneGraphics.fillCircle(16, 24, 2)
    phoneGraphics.generateTexture('phone', 32, 32)

    // ========== IMPROVED USB DRIVE ==========
    const usbGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // USB shadow
    usbGraphics.fillStyle(0x000000, 0.3)
    usbGraphics.fillEllipse(16, 28, 14, 4)
    // USB body
    usbGraphics.fillStyle(0xc0392b, 1)
    usbGraphics.fillRoundedRect(10, 10, 12, 14, 2)
    // USB highlight
    usbGraphics.fillStyle(0xe74c3c, 1)
    usbGraphics.fillRoundedRect(11, 11, 10, 6, 1)
    // USB connector
    usbGraphics.fillStyle(0xbdc3c7, 1)
    usbGraphics.fillRect(12, 4, 8, 8)
    // USB connector lines
    usbGraphics.fillStyle(0x95a5a6, 1)
    usbGraphics.fillRect(14, 5, 1, 5)
    usbGraphics.fillRect(17, 5, 1, 5)
    // Warning icon
    usbGraphics.fillStyle(0xf1c40f, 1)
    usbGraphics.fillTriangle(16, 14, 19, 20, 13, 20)
    usbGraphics.fillStyle(0xc0392b, 1)
    usbGraphics.fillRect(15, 16, 2, 2)
    usbGraphics.generateTexture('usb', 32, 32)

    // ========== IMPROVED DOOR ==========
    const doorGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Door frame
    doorGraphics.fillStyle(0x5d4e37, 1)
    doorGraphics.fillRect(0, 0, 32, 64)
    // Door
    doorGraphics.fillStyle(0x8b7355, 1)
    doorGraphics.fillRoundedRect(3, 3, 26, 58, 2)
    // Door panels
    doorGraphics.fillStyle(0x7a6548, 1)
    doorGraphics.fillRoundedRect(6, 8, 20, 20, 2)
    doorGraphics.fillRoundedRect(6, 34, 20, 20, 2)
    // Door handle
    doorGraphics.fillStyle(0xf1c40f, 1)
    doorGraphics.fillCircle(24, 36, 3)
    doorGraphics.fillStyle(0xd4ac0d, 1)
    doorGraphics.fillCircle(24, 36, 2)
    // Card reader
    doorGraphics.fillStyle(0x2c3e50, 1)
    doorGraphics.fillRoundedRect(5, 28, 8, 12, 1)
    doorGraphics.fillStyle(0xe74c3c, 1)
    doorGraphics.fillCircle(9, 32, 2)
    doorGraphics.generateTexture('door', 32, 64)

    // ========== IMPROVED SERVER ==========
    const serverGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Server rack
    serverGraphics.fillStyle(0x1a1a2e, 1)
    serverGraphics.fillRoundedRect(2, 0, 28, 48, 3)
    // Server bezel
    serverGraphics.fillStyle(0x2c3e50, 1)
    serverGraphics.fillRoundedRect(4, 2, 24, 44, 2)
    // Server units
    for (let i = 0; i < 4; i++) {
      const y = 5 + i * 10
      // Unit
      serverGraphics.fillStyle(0x34495e, 1)
      serverGraphics.fillRoundedRect(6, y, 20, 8, 1)
      // Status LED
      serverGraphics.fillStyle(i % 2 === 0 ? 0x00ff88 : 0x3498db, 1)
      serverGraphics.fillCircle(10, y + 4, 2)
      // Drive bays
      serverGraphics.fillStyle(0x1a1a2e, 1)
      serverGraphics.fillRect(14, y + 2, 10, 4)
      // Activity lights
      serverGraphics.fillStyle(0xf39c12, Math.random() > 0.5 ? 1 : 0.3)
      serverGraphics.fillCircle(22, y + 4, 1)
    }
    // Ventilation
    serverGraphics.fillStyle(0x1a1a2e, 0.5)
    for (let i = 0; i < 3; i++) {
      serverGraphics.fillRect(8 + i * 6, 45, 4, 1)
    }
    serverGraphics.generateTexture('server', 32, 48)

    // ========== IMPROVED PRINTER ==========
    const printerGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Printer body
    printerGraphics.fillStyle(0xecf0f1, 1)
    printerGraphics.fillRoundedRect(2, 10, 28, 18, 3)
    // Printer top (paper tray)
    printerGraphics.fillStyle(0xbdc3c7, 1)
    printerGraphics.fillRoundedRect(4, 2, 24, 10, 2)
    // Paper slot
    printerGraphics.fillStyle(0x95a5a6, 1)
    printerGraphics.fillRect(8, 4, 16, 2)
    // Output tray
    printerGraphics.fillStyle(0xbdc3c7, 1)
    printerGraphics.fillRect(6, 24, 20, 4)
    // Control panel
    printerGraphics.fillStyle(0x2c3e50, 1)
    printerGraphics.fillRoundedRect(18, 14, 10, 6, 1)
    // Status LED
    printerGraphics.fillStyle(0x00ff88, 1)
    printerGraphics.fillCircle(6, 16, 2)
    printerGraphics.generateTexture('printer', 32, 32)

    // ========== IMPROVED COFFEE MACHINE ==========
    const coffeeGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Machine body
    coffeeGraphics.fillStyle(0x1a1a2e, 1)
    coffeeGraphics.fillRoundedRect(4, 2, 24, 28, 3)
    // Machine front
    coffeeGraphics.fillStyle(0x2c3e50, 1)
    coffeeGraphics.fillRoundedRect(6, 4, 20, 24, 2)
    // Display
    coffeeGraphics.fillStyle(0x00d4ff, 1)
    coffeeGraphics.fillRoundedRect(8, 6, 16, 6, 1)
    // Coffee spout
    coffeeGraphics.fillStyle(0x1a1a2e, 1)
    coffeeGraphics.fillRect(12, 14, 8, 4)
    // Cup area
    coffeeGraphics.fillStyle(0x34495e, 1)
    coffeeGraphics.fillRoundedRect(10, 20, 12, 6, 1)
    // Cup
    coffeeGraphics.fillStyle(0xecf0f1, 1)
    coffeeGraphics.fillRoundedRect(12, 21, 8, 5, 1)
    // Coffee
    coffeeGraphics.fillStyle(0x6b4423, 1)
    coffeeGraphics.fillRect(13, 22, 6, 2)
    coffeeGraphics.generateTexture('coffee', 32, 32)

    // ========== NPC CHARACTER ==========
    const npcGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Shadow
    npcGraphics.fillStyle(0x000000, 0.2)
    npcGraphics.fillEllipse(16, 30, 20, 8)
    // Legs
    npcGraphics.fillStyle(0x2c3e50, 1)
    npcGraphics.fillRoundedRect(10, 22, 5, 8, 2)
    npcGraphics.fillRoundedRect(17, 22, 5, 8, 2)
    // Body (red shirt - suspicious)
    npcGraphics.fillStyle(0xc0392b, 1)
    npcGraphics.fillRoundedRect(8, 12, 16, 12, 3)
    npcGraphics.fillStyle(0xe74c3c, 1)
    npcGraphics.fillRoundedRect(9, 13, 14, 10, 2)
    // Head
    npcGraphics.fillStyle(0xf5d0a9, 1)
    npcGraphics.fillCircle(16, 9, 7)
    // Hair
    npcGraphics.fillStyle(0x2c3e50, 1)
    npcGraphics.fillEllipse(16, 5, 8, 5)
    // Suspicious expression
    npcGraphics.fillStyle(0x2c3e50, 1)
    npcGraphics.fillCircle(13, 8, 1)
    npcGraphics.fillCircle(19, 8, 1)
    npcGraphics.generateTexture('npc', 32, 32)

    // ========== HIGHLIGHT GLOW ==========
    const glowGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Outer glow
    glowGraphics.lineStyle(4, 0x00ff88, 0.3)
    glowGraphics.strokeCircle(24, 24, 22)
    // Middle glow
    glowGraphics.lineStyle(3, 0x00ff88, 0.5)
    glowGraphics.strokeCircle(24, 24, 18)
    // Inner glow
    glowGraphics.lineStyle(2, 0x00ff88, 0.8)
    glowGraphics.strokeCircle(24, 24, 14)
    glowGraphics.generateTexture('glow', 48, 48)

    // ========== SHADOWS ==========
    const shadowGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    shadowGraphics.fillStyle(0x000000, 0.25)
    shadowGraphics.fillEllipse(16, 8, 28, 12)
    shadowGraphics.generateTexture('shadow', 32, 16)

    const shadowLargeGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    shadowLargeGraphics.fillStyle(0x000000, 0.2)
    shadowLargeGraphics.fillEllipse(24, 8, 44, 14)
    shadowLargeGraphics.generateTexture('shadow-large', 48, 16)

    // ========== PARTICLES ==========
    const particleGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    particleGraphics.fillStyle(0x00ff88, 1)
    particleGraphics.fillCircle(4, 4, 4)
    particleGraphics.generateTexture('particle', 8, 8)

    const sparkleGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    sparkleGraphics.fillStyle(0xffffff, 1)
    // Draw a 4-pointed star manually
    sparkleGraphics.beginPath()
    sparkleGraphics.moveTo(8, 0)
    sparkleGraphics.lineTo(10, 6)
    sparkleGraphics.lineTo(16, 8)
    sparkleGraphics.lineTo(10, 10)
    sparkleGraphics.lineTo(8, 16)
    sparkleGraphics.lineTo(6, 10)
    sparkleGraphics.lineTo(0, 8)
    sparkleGraphics.lineTo(6, 6)
    sparkleGraphics.closePath()
    sparkleGraphics.fillPath()
    sparkleGraphics.generateTexture('sparkle', 16, 16)

    // ========== SOFT GLOW ==========
    const softGlowGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    softGlowGraphics.fillStyle(0x00ff88, 0.1)
    softGlowGraphics.fillCircle(32, 32, 32)
    softGlowGraphics.fillStyle(0x00ff88, 0.2)
    softGlowGraphics.fillCircle(32, 32, 24)
    softGlowGraphics.fillStyle(0x00ff88, 0.3)
    softGlowGraphics.fillCircle(32, 32, 16)
    softGlowGraphics.fillStyle(0x00ff88, 0.4)
    softGlowGraphics.fillCircle(32, 32, 8)
    softGlowGraphics.generateTexture('soft-glow', 64, 64)

    // ========== UI BUTTON ==========
    const buttonGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Button shadow
    buttonGraphics.fillStyle(0x000000, 0.3)
    buttonGraphics.fillRoundedRect(4, 6, 196, 46, 8)
    // Button body
    buttonGraphics.fillStyle(0x2980b9, 1)
    buttonGraphics.fillRoundedRect(0, 0, 200, 50, 10)
    // Button highlight
    buttonGraphics.fillStyle(0x3498db, 1)
    buttonGraphics.fillRoundedRect(4, 4, 192, 25, 8)
    buttonGraphics.generateTexture('button', 200, 56)

    const buttonHoverGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    buttonHoverGraphics.fillStyle(0x000000, 0.3)
    buttonHoverGraphics.fillRoundedRect(4, 6, 196, 46, 8)
    buttonHoverGraphics.fillStyle(0x1abc9c, 1)
    buttonHoverGraphics.fillRoundedRect(0, 0, 200, 50, 10)
    buttonHoverGraphics.fillStyle(0x2ecc71, 1)
    buttonHoverGraphics.fillRoundedRect(4, 4, 192, 25, 8)
    buttonHoverGraphics.generateTexture('button-hover', 200, 56)

    // ========== DIALOG BOX ==========
    const dialogGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Dialog shadow
    dialogGraphics.fillStyle(0x000000, 0.5)
    dialogGraphics.fillRoundedRect(10, 10, 900, 550, 15)
    // Dialog background
    dialogGraphics.fillStyle(0x0d1b2a, 0.98)
    dialogGraphics.fillRoundedRect(0, 0, 900, 550, 15)
    // Dialog border
    dialogGraphics.lineStyle(3, 0x00ff88, 1)
    dialogGraphics.strokeRoundedRect(0, 0, 900, 550, 15)
    // Inner glow line
    dialogGraphics.lineStyle(1, 0x00ff88, 0.3)
    dialogGraphics.strokeRoundedRect(5, 5, 890, 540, 12)
    // Corner accents
    dialogGraphics.fillStyle(0x00ff88, 1)
    dialogGraphics.fillTriangle(0, 20, 20, 0, 0, 0)
    dialogGraphics.fillTriangle(900, 20, 880, 0, 900, 0)
    dialogGraphics.fillTriangle(0, 530, 20, 550, 0, 550)
    dialogGraphics.fillTriangle(900, 530, 880, 550, 900, 550)
    dialogGraphics.generateTexture('dialog', 910, 560)

    // ========== SCENARIO PREVIEWS ==========
    this.createScenarioPreviews()

    // ========== RESULT INDICATORS ==========
    const correctGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Outer ring
    correctGraphics.lineStyle(4, 0x27ae60, 0.5)
    correctGraphics.strokeCircle(30, 30, 28)
    // Inner circle
    correctGraphics.fillStyle(0x27ae60, 1)
    correctGraphics.fillCircle(30, 30, 24)
    // Checkmark
    correctGraphics.lineStyle(5, 0xffffff, 1)
    correctGraphics.beginPath()
    correctGraphics.moveTo(18, 30)
    correctGraphics.lineTo(26, 38)
    correctGraphics.lineTo(42, 22)
    correctGraphics.strokePath()
    correctGraphics.generateTexture('correct', 60, 60)

    const wrongGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    wrongGraphics.lineStyle(4, 0xe74c3c, 0.5)
    wrongGraphics.strokeCircle(30, 30, 28)
    wrongGraphics.fillStyle(0xe74c3c, 1)
    wrongGraphics.fillCircle(30, 30, 24)
    wrongGraphics.lineStyle(5, 0xffffff, 1)
    wrongGraphics.beginPath()
    wrongGraphics.moveTo(20, 20)
    wrongGraphics.lineTo(40, 40)
    wrongGraphics.moveTo(40, 20)
    wrongGraphics.lineTo(20, 40)
    wrongGraphics.strokePath()
    wrongGraphics.generateTexture('wrong', 60, 60)
  }

  createScenarioPreviews() {
    // ========== EMAIL PREVIEW ==========
    const emailPreviewGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Monitor
    emailPreviewGraphics.fillStyle(0x1a1a2e, 1)
    emailPreviewGraphics.fillRoundedRect(10, 5, 260, 175, 8)
    // Screen bezel
    emailPreviewGraphics.fillStyle(0x2c3e50, 1)
    emailPreviewGraphics.fillRoundedRect(15, 10, 250, 160, 5)
    // Screen
    emailPreviewGraphics.fillStyle(0xecf0f1, 1)
    emailPreviewGraphics.fillRoundedRect(20, 15, 240, 150, 3)
    // Email header (suspicious red)
    emailPreviewGraphics.fillStyle(0xe74c3c, 1)
    emailPreviewGraphics.fillRoundedRect(25, 20, 230, 35, 3)
    // From address
    emailPreviewGraphics.fillStyle(0xffffff, 0.9)
    emailPreviewGraphics.fillRoundedRect(30, 25, 150, 10, 2)
    emailPreviewGraphics.fillRoundedRect(30, 40, 100, 8, 2)
    // Email body
    emailPreviewGraphics.fillStyle(0xbdc3c7, 1)
    emailPreviewGraphics.fillRoundedRect(25, 65, 200, 8, 2)
    emailPreviewGraphics.fillRoundedRect(25, 80, 180, 8, 2)
    emailPreviewGraphics.fillRoundedRect(25, 95, 220, 8, 2)
    emailPreviewGraphics.fillRoundedRect(25, 110, 160, 8, 2)
    // Suspicious link button
    emailPreviewGraphics.fillStyle(0xe74c3c, 1)
    emailPreviewGraphics.fillRoundedRect(25, 130, 140, 30, 5)
    emailPreviewGraphics.fillStyle(0xffffff, 1)
    emailPreviewGraphics.fillRoundedRect(35, 140, 80, 10, 2)
    // Warning icon
    emailPreviewGraphics.fillStyle(0xf1c40f, 1)
    emailPreviewGraphics.fillTriangle(230, 130, 250, 160, 210, 160)
    emailPreviewGraphics.fillStyle(0x000000, 1)
    emailPreviewGraphics.fillRect(228, 140, 4, 10)
    emailPreviewGraphics.fillRect(228, 153, 4, 4)
    // Monitor stand
    emailPreviewGraphics.fillStyle(0x1a1a2e, 1)
    emailPreviewGraphics.fillRect(120, 180, 40, 20)
    emailPreviewGraphics.fillRoundedRect(100, 195, 80, 10, 3)
    emailPreviewGraphics.generateTexture('email-preview', 280, 210)

    // ========== PHONE PREVIEW ==========
    const phonePreviewGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Phone body
    phonePreviewGraphics.fillStyle(0x1a1a2e, 1)
    phonePreviewGraphics.fillRoundedRect(30, 10, 120, 260, 15)
    // Phone bezel
    phonePreviewGraphics.fillStyle(0x2c3e50, 1)
    phonePreviewGraphics.fillRoundedRect(35, 15, 110, 250, 12)
    // Screen
    phonePreviewGraphics.fillStyle(0x0d1b2a, 1)
    phonePreviewGraphics.fillRoundedRect(40, 40, 100, 190, 5)
    // Incoming call text
    phonePreviewGraphics.fillStyle(0x00ff88, 1)
    phonePreviewGraphics.fillRoundedRect(50, 50, 80, 15, 3)
    // Caller icon (suspicious)
    phonePreviewGraphics.fillStyle(0xe74c3c, 1)
    phonePreviewGraphics.fillCircle(90, 110, 35)
    phonePreviewGraphics.fillStyle(0xc0392b, 1)
    phonePreviewGraphics.fillCircle(90, 110, 28)
    // Unknown caller icon
    phonePreviewGraphics.fillStyle(0xffffff, 1)
    phonePreviewGraphics.fillRect(85, 100, 10, 15)
    phonePreviewGraphics.fillCircle(90, 95, 8)
    // Caller name area
    phonePreviewGraphics.fillStyle(0xffffff, 0.9)
    phonePreviewGraphics.fillRoundedRect(55, 155, 70, 12, 3)
    phonePreviewGraphics.fillStyle(0xffffff, 0.6)
    phonePreviewGraphics.fillRoundedRect(65, 172, 50, 8, 2)
    // Call buttons
    phonePreviewGraphics.fillStyle(0x27ae60, 1)
    phonePreviewGraphics.fillCircle(65, 210, 18)
    phonePreviewGraphics.fillStyle(0xe74c3c, 1)
    phonePreviewGraphics.fillCircle(115, 210, 18)
    // Button icons
    phonePreviewGraphics.fillStyle(0xffffff, 1)
    phonePreviewGraphics.fillRoundedRect(58, 205, 14, 10, 3)
    phonePreviewGraphics.lineStyle(3, 0xffffff, 1)
    phonePreviewGraphics.beginPath()
    phonePreviewGraphics.moveTo(108, 203)
    phonePreviewGraphics.lineTo(122, 217)
    phonePreviewGraphics.moveTo(122, 203)
    phonePreviewGraphics.lineTo(108, 217)
    phonePreviewGraphics.strokePath()
    phonePreviewGraphics.generateTexture('phone-preview', 180, 280)

    // ========== USB PREVIEW ==========
    const usbPreviewGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Ground/parking lot
    usbPreviewGraphics.fillStyle(0x4a4a4a, 1)
    usbPreviewGraphics.fillRect(0, 140, 280, 70)
    // Parking line
    usbPreviewGraphics.fillStyle(0xf1c40f, 1)
    usbPreviewGraphics.fillRect(20, 145, 5, 60)
    // USB drive (large)
    usbPreviewGraphics.fillStyle(0xc0392b, 1)
    usbPreviewGraphics.fillRoundedRect(90, 60, 100, 90, 8)
    // USB highlight
    usbPreviewGraphics.fillStyle(0xe74c3c, 1)
    usbPreviewGraphics.fillRoundedRect(95, 65, 90, 40, 5)
    // USB connector
    usbPreviewGraphics.fillStyle(0xbdc3c7, 1)
    usbPreviewGraphics.fillRect(110, 20, 60, 45)
    usbPreviewGraphics.fillStyle(0x95a5a6, 1)
    usbPreviewGraphics.fillRect(120, 25, 8, 35)
    usbPreviewGraphics.fillRect(140, 25, 8, 35)
    usbPreviewGraphics.fillRect(152, 25, 8, 35)
    // Label
    usbPreviewGraphics.fillStyle(0xecf0f1, 1)
    usbPreviewGraphics.fillRoundedRect(100, 110, 80, 30, 3)
    // "CONFIDENTIAL" text
    usbPreviewGraphics.fillStyle(0xe74c3c, 1)
    usbPreviewGraphics.fillRoundedRect(105, 115, 70, 10, 2)
    usbPreviewGraphics.fillStyle(0x7f8c8d, 1)
    usbPreviewGraphics.fillRoundedRect(110, 130, 60, 6, 1)
    // Question mark
    usbPreviewGraphics.fillStyle(0xf1c40f, 1)
    usbPreviewGraphics.fillCircle(230, 50, 25)
    usbPreviewGraphics.fillStyle(0x000000, 1)
    usbPreviewGraphics.fillRect(225, 35, 10, 20)
    usbPreviewGraphics.fillRect(225, 60, 10, 8)
    usbPreviewGraphics.generateTexture('usb-preview', 280, 210)

    // ========== DOCUMENT PREVIEW ==========
    const docPreviewGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Desk surface
    docPreviewGraphics.fillStyle(0x8b5a2b, 1)
    docPreviewGraphics.fillRect(0, 160, 280, 50)
    // Paper shadow
    docPreviewGraphics.fillStyle(0x000000, 0.2)
    docPreviewGraphics.fillRect(35, 20, 220, 150)
    // Paper
    docPreviewGraphics.fillStyle(0xffffff, 1)
    docPreviewGraphics.fillRect(30, 15, 220, 150)
    // Paper fold
    docPreviewGraphics.fillStyle(0xecf0f1, 1)
    docPreviewGraphics.fillTriangle(220, 15, 250, 15, 250, 45)
    // Header
    docPreviewGraphics.fillStyle(0x3498db, 1)
    docPreviewGraphics.fillRect(45, 25, 150, 20)
    // Text lines
    docPreviewGraphics.fillStyle(0x7f8c8d, 1)
    docPreviewGraphics.fillRect(45, 55, 190, 6)
    docPreviewGraphics.fillRect(45, 68, 170, 6)
    docPreviewGraphics.fillRect(45, 81, 180, 6)
    docPreviewGraphics.fillRect(45, 94, 150, 6)
    // CONFIDENTIAL stamp
    docPreviewGraphics.lineStyle(4, 0xe74c3c, 0.8)
    docPreviewGraphics.strokeRoundedRect(60, 115, 160, 40, 5)
    docPreviewGraphics.fillStyle(0xe74c3c, 0.8)
    docPreviewGraphics.fillRoundedRect(75, 125, 130, 20, 3)
    docPreviewGraphics.generateTexture('doc-preview', 280, 210)

    // ========== WIFI PREVIEW ==========
    const wifiPreviewGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Coffee shop background
    wifiPreviewGraphics.fillStyle(0x6b4423, 1)
    wifiPreviewGraphics.fillRect(0, 0, 280, 220)
    // Table
    wifiPreviewGraphics.fillStyle(0x8b5a2b, 1)
    wifiPreviewGraphics.fillRoundedRect(20, 140, 240, 70, 5)
    // Laptop
    wifiPreviewGraphics.fillStyle(0xbdc3c7, 1)
    wifiPreviewGraphics.fillRoundedRect(60, 70, 160, 100, 5)
    // Laptop screen
    wifiPreviewGraphics.fillStyle(0x2c3e50, 1)
    wifiPreviewGraphics.fillRoundedRect(65, 75, 150, 90, 3)
    // Screen content
    wifiPreviewGraphics.fillStyle(0x3498db, 1)
    wifiPreviewGraphics.fillRoundedRect(70, 80, 140, 80, 2)
    // WiFi warning icon
    wifiPreviewGraphics.lineStyle(5, 0xe74c3c, 1)
    wifiPreviewGraphics.beginPath()
    wifiPreviewGraphics.arc(140, 130, 15, Math.PI * 1.2, Math.PI * 1.8)
    wifiPreviewGraphics.strokePath()
    wifiPreviewGraphics.beginPath()
    wifiPreviewGraphics.arc(140, 130, 25, Math.PI * 1.2, Math.PI * 1.8)
    wifiPreviewGraphics.strokePath()
    wifiPreviewGraphics.beginPath()
    wifiPreviewGraphics.arc(140, 130, 35, Math.PI * 1.2, Math.PI * 1.8)
    wifiPreviewGraphics.strokePath()
    // Warning dot
    wifiPreviewGraphics.fillStyle(0xe74c3c, 1)
    wifiPreviewGraphics.fillCircle(140, 130, 5)
    // Warning triangle
    wifiPreviewGraphics.fillStyle(0xf1c40f, 1)
    wifiPreviewGraphics.fillTriangle(220, 30, 250, 80, 190, 80)
    wifiPreviewGraphics.fillStyle(0x000000, 1)
    wifiPreviewGraphics.fillRect(217, 45, 6, 20)
    wifiPreviewGraphics.fillRect(217, 70, 6, 6)
    // Coffee cup
    wifiPreviewGraphics.fillStyle(0xecf0f1, 1)
    wifiPreviewGraphics.fillRoundedRect(30, 145, 25, 30, 3)
    wifiPreviewGraphics.fillStyle(0x6b4423, 1)
    wifiPreviewGraphics.fillRect(33, 150, 19, 10)
    wifiPreviewGraphics.generateTexture('wifi-preview', 280, 220)

    // ========== DOOR PREVIEW ==========
    const doorPreviewGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Wall
    doorPreviewGraphics.fillStyle(0x7f8c8d, 1)
    doorPreviewGraphics.fillRect(0, 0, 280, 210)
    // Door frame
    doorPreviewGraphics.fillStyle(0x5d4e37, 1)
    doorPreviewGraphics.fillRoundedRect(70, 10, 140, 195, 5)
    // Door
    doorPreviewGraphics.fillStyle(0x8b7355, 1)
    doorPreviewGraphics.fillRoundedRect(80, 20, 120, 180, 3)
    // Door window
    doorPreviewGraphics.fillStyle(0x87ceeb, 0.5)
    doorPreviewGraphics.fillRoundedRect(100, 35, 80, 60, 3)
    // Person silhouette (suspicious)
    doorPreviewGraphics.fillStyle(0x2c3e50, 0.7)
    doorPreviewGraphics.fillCircle(140, 55, 15)
    doorPreviewGraphics.fillRoundedRect(125, 70, 30, 25, 5)
    // Door handle
    doorPreviewGraphics.fillStyle(0xf1c40f, 1)
    doorPreviewGraphics.fillCircle(175, 120, 8)
    // Card reader
    doorPreviewGraphics.fillStyle(0x2c3e50, 1)
    doorPreviewGraphics.fillRoundedRect(220, 80, 45, 60, 5)
    // Reader screen
    doorPreviewGraphics.fillStyle(0x1a1a2e, 1)
    doorPreviewGraphics.fillRoundedRect(225, 85, 35, 25, 3)
    // Red light (access denied)
    doorPreviewGraphics.fillStyle(0xe74c3c, 1)
    doorPreviewGraphics.fillCircle(242, 125, 6)
    // Card slot
    doorPreviewGraphics.fillStyle(0x1a1a2e, 1)
    doorPreviewGraphics.fillRect(230, 115, 25, 3)
    doorPreviewGraphics.generateTexture('door-preview', 280, 210)

    // ========== SERVER PREVIEW ==========
    const serverPreviewGraphics = this.make.graphics({ x: 0, y: 0, add: false })
    // Server room background
    serverPreviewGraphics.fillStyle(0x0d1b2a, 1)
    serverPreviewGraphics.fillRect(0, 0, 280, 210)
    // Floor grid
    serverPreviewGraphics.lineStyle(1, 0x1a1a2e, 0.5)
    for (let i = 0; i < 10; i++) {
      serverPreviewGraphics.lineBetween(0, 170 + i * 5, 280, 170 + i * 5 - 30)
      serverPreviewGraphics.lineBetween(i * 30, 210, i * 30 + 50, 140)
    }
    // Server racks
    for (let i = 0; i < 3; i++) {
      const x = 30 + i * 85
      // Rack
      serverPreviewGraphics.fillStyle(0x1a1a2e, 1)
      serverPreviewGraphics.fillRoundedRect(x, 20, 65, 160, 5)
      // Rack bezel
      serverPreviewGraphics.fillStyle(0x2c3e50, 1)
      serverPreviewGraphics.fillRoundedRect(x + 5, 25, 55, 150, 3)
      // Server units
      for (let j = 0; j < 5; j++) {
        const y = 30 + j * 28
        serverPreviewGraphics.fillStyle(0x34495e, 1)
        serverPreviewGraphics.fillRoundedRect(x + 8, y, 49, 24, 2)
        // LEDs
        serverPreviewGraphics.fillStyle(j % 2 === 0 ? 0x00ff88 : 0x3498db, 1)
        serverPreviewGraphics.fillCircle(x + 15, y + 12, 3)
        // Activity
        serverPreviewGraphics.fillStyle(0xf39c12, Math.random() > 0.3 ? 1 : 0.3)
        serverPreviewGraphics.fillCircle(x + 50, y + 12, 2)
      }
    }
    // Warning sign
    serverPreviewGraphics.fillStyle(0xe74c3c, 1)
    serverPreviewGraphics.fillRoundedRect(90, 5, 100, 20, 3)
    serverPreviewGraphics.fillStyle(0xffffff, 1)
    serverPreviewGraphics.fillRoundedRect(100, 10, 80, 10, 2)
    serverPreviewGraphics.generateTexture('server-preview', 280, 210)
  }

  create() {
    this.scene.start('MenuScene')
  }
}
