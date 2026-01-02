import Phaser from 'phaser'

export default class InteractiveObject extends Phaser.GameObjects.Sprite {
  constructor(scene, x, y, texture, scenarioId) {
    super(scene, x, y, texture)

    this.scene = scene
    this.scenarioId = scenarioId
    this.active = true
    this.baseY = y

    // Add shadow first (below everything)
    const shadowType = (texture === 'server' || texture === 'door') ? 'shadow-large' : 'shadow'
    this.shadow = scene.add.image(x, y + 20, shadowType)
    this.shadow.setDepth(1)
    this.shadow.setAlpha(0.5)

    // Add soft ambient glow behind object
    this.ambientGlow = scene.add.image(x, y, 'soft-glow')
    this.ambientGlow.setDepth(2)
    this.ambientGlow.setAlpha(0.3)
    this.ambientGlow.setScale(0.8)

    // Add to scene
    scene.add.existing(this)

    // Add to interactive objects group
    scene.interactiveObjects.add(this)

    // Set depth
    this.setDepth(5)

    // Create highlight glow (visible when nearby)
    this.highlight = scene.add.image(x, y, 'glow')
    this.highlight.setDepth(4)
    this.highlight.setVisible(false)
    this.highlight.setAlpha(0.9)
    this.highlight.setScale(1.2)

    // Pulsing animation for highlight
    scene.tweens.add({
      targets: this.highlight,
      scaleX: 1.6,
      scaleY: 1.6,
      alpha: 0.3,
      duration: 600,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Ambient glow pulse
    scene.tweens.add({
      targets: this.ambientGlow,
      alpha: 0.5,
      scaleX: 0.9,
      scaleY: 0.9,
      duration: 2000,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
    })

    // Subtle floating animation for the object
    this.floatTween = scene.tweens.add({
      targets: this,
      y: y - 4,
      duration: 1500,
      yoyo: true,
      repeat: -1,
      ease: 'Sine.easeInOut',
      onUpdate: () => {
        // Update shadow position and scale based on float height
        const floatOffset = this.baseY - this.y
        this.shadow.setY(this.baseY + 20)
        this.shadow.setScale(1 - floatOffset * 0.02)
        this.shadow.setAlpha(0.5 - floatOffset * 0.03)
        // Update ambient glow position
        this.ambientGlow.setY(this.y)
        this.highlight.setY(this.y)
      }
    })

    // Create particle emitter for sparkle effect
    this.particles = scene.add.particles(x, y, 'sparkle', {
      speed: { min: 10, max: 30 },
      scale: { start: 0.3, end: 0 },
      alpha: { start: 0.6, end: 0 },
      lifespan: 1000,
      frequency: 2000,
      quantity: 1,
      blendMode: 'ADD',
    })
    this.particles.setDepth(6)
  }

  showHighlight() {
    this.highlight.setVisible(true)
    // Increase sparkle frequency when highlighted
    this.particles.frequency = 300
  }

  hideHighlight() {
    this.highlight.setVisible(false)
    // Return to normal sparkle frequency
    this.particles.frequency = 2000
  }

  destroy() {
    if (this.highlight) this.highlight.destroy()
    if (this.shadow) this.shadow.destroy()
    if (this.ambientGlow) this.ambientGlow.destroy()
    if (this.particles) this.particles.destroy()
    if (this.floatTween) this.floatTween.destroy()
    super.destroy()
  }
}
