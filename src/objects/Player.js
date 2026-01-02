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

    // Breathing animation
    scene.tweens.add({
      targets: this,
      scaleX: 1.35,
      scaleY: 1.25,
      duration: 1000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

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

    // Track if moving for trail effect
    this.wasMoving = false
  }

  preUpdate(time, delta) {
    super.preUpdate(time, delta)

    // Update shadow and glow positions
    this.shadow.setPosition(this.x, this.y + 16)
    this.glow.setPosition(this.x, this.y)

    // Update trail position and emit if moving
    this.trail.setPosition(this.x, this.y + 8)

    const isMoving = this.body.velocity.x !== 0 || this.body.velocity.y !== 0
    if (isMoving) {
      this.trail.emitParticle(1)
    }
  }

  destroy() {
    if (this.shadow) this.shadow.destroy()
    if (this.glow) this.glow.destroy()
    if (this.trail) this.trail.destroy()
    super.destroy()
  }
}
