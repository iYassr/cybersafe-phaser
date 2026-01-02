import Phaser from 'phaser'

export default class Player extends Phaser.Physics.Arcade.Sprite {
  constructor(scene, x, y) {
    super(scene, x, y, 'player')

    this.scene = scene

    // Add shadow below player
    this.shadow = scene.add.image(x, y + 16, 'shadow')
    this.shadow.setDepth(1)
    this.shadow.setAlpha(0.4)
    this.shadow.setScale(1.2)

    // Add soft glow around player
    this.glow = scene.add.image(x, y, 'soft-glow')
    this.glow.setDepth(9)
    this.glow.setAlpha(0.2)
    this.glow.setScale(0.6)
    this.glow.setTint(0x3498db)

    // Add to scene
    scene.add.existing(this)
    scene.physics.add.existing(this)

    // Set collide with world bounds
    this.setCollideWorldBounds(true)

    // Set depth so player appears above floor
    this.setDepth(10)

    // Scale up slightly for visibility
    this.setScale(1.3)

    // Create walk animation from spritesheet
    this.createAnimations()

    // Create trail particles
    this.trail = scene.add.particles(x, y, 'particle', {
      speed: { min: 5, max: 15 },
      scale: { start: 0.4, end: 0 },
      alpha: { start: 0.4, end: 0 },
      tint: 0x3498db,
      lifespan: 400,
      frequency: -1, // Manual emission
      quantity: 2,
      blendMode: 'ADD',
    })
    this.trail.setDepth(8)

    // Glow pulse
    scene.tweens.add({
      targets: this.glow,
      alpha: 0.35,
      scaleX: 0.7,
      scaleY: 0.7,
      duration: 800,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Track movement state
    this.isMoving = false
    this.lastDirection = 'down'

    // Footstep sound timer
    this.footstepTimer = 0
    this.footstepInterval = 250 // ms between footsteps
  }

  createAnimations() {
    // Create spritesheet frames from generated texture
    if (!this.scene.textures.exists('player-sheet')) return

    // Add spritesheet to texture manager
    this.scene.textures.addSpriteSheet('player-walk',
      this.scene.textures.get('player-sheet').getSourceImage(),
      { frameWidth: 32, frameHeight: 32 }
    )

    // Create walk animation
    if (!this.scene.anims.exists('walk')) {
      this.scene.anims.create({
        key: 'walk',
        frames: this.scene.anims.generateFrameNumbers('player-walk', { start: 0, end: 3 }),
        frameRate: 8,
        repeat: -1
      })
    }

    // Create idle animation (just first frame)
    if (!this.scene.anims.exists('idle')) {
      this.scene.anims.create({
        key: 'idle',
        frames: [{ key: 'player-walk', frame: 0 }],
        frameRate: 1
      })
    }
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    // Update shadow and glow positions
    this.shadow.setPosition(this.x, this.y + 16)
    this.glow.setPosition(this.x, this.y)

    // Update trail position
    this.trail.setPosition(this.x, this.y + 8)

    // Check if moving
    const velocityX = this.body.velocity.x
    const velocityY = this.body.velocity.y
    const isMoving = velocityX !== 0 || velocityY !== 0

    // Handle animation and direction
    if (isMoving) {
      // Emit trail particles
      this.trail.emitParticle(1)

      // Play walk animation
      if (!this.isMoving && this.scene.anims.exists('walk')) {
        this.play('walk')
      }

      // Flip sprite based on horizontal direction
      if (velocityX < 0) {
        this.setFlipX(true)
        this.lastDirection = 'left'
      } else if (velocityX > 0) {
        this.setFlipX(false)
        this.lastDirection = 'right'
      }

      // Play footstep sounds
      this.footstepTimer += delta
      if (this.footstepTimer >= this.footstepInterval) {
        this.footstepTimer = 0
        const soundManager = this.scene.registry.get('soundManager')
        if (soundManager) {
          soundManager.playFootstep()
        }
      }
    } else {
      // Stop animation when idle
      if (this.isMoving && this.scene.anims.exists('idle')) {
        this.play('idle')
      }
      this.footstepTimer = 0
    }

    this.isMoving = isMoving
  }

  destroy() {
    if (this.shadow) this.shadow.destroy()
    if (this.glow) this.glow.destroy()
    if (this.trail) this.trail.destroy()
    super.destroy()
  }
}
