// Procedural sound generation using Web Audio API
export default class SoundManager {
  constructor(scene) {
    this.scene = scene
    this.audioContext = null
    this.enabled = true
    this.volume = 0.3
    this.init()
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
    } catch (e) {
      console.warn('Web Audio API not supported')
      this.enabled = false
    }
  }

  resume() {
    if (this.audioContext && this.audioContext.state === 'suspended') {
      this.audioContext.resume()
    }
  }

  // Correct answer - pleasant ascending chime
  playCorrect() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const osc1 = this.audioContext.createOscillator()
    const osc2 = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc1.type = 'sine'
    osc2.type = 'sine'
    osc1.frequency.setValueAtTime(523.25, now) // C5
    osc1.frequency.setValueAtTime(659.25, now + 0.1) // E5
    osc2.frequency.setValueAtTime(783.99, now + 0.15) // G5

    gain.gain.setValueAtTime(this.volume, now)
    gain.gain.setTargetAtTime(0.01, now, 0.15)

    osc1.connect(gain)
    osc2.connect(gain)
    gain.connect(this.audioContext.destination)

    osc1.start(now)
    osc2.start(now + 0.1)
    osc1.stop(now + 0.3)
    osc2.stop(now + 0.4)
  }

  // Wrong answer - descending buzzer
  playWrong() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.type = 'square'
    osc.frequency.setValueAtTime(200, now)
    osc.frequency.linearRampToValueAtTime(100, now + 0.3)

    gain.gain.setValueAtTime(this.volume * 0.5, now)
    gain.gain.linearRampToValueAtTime(0, now + 0.3)

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.start(now)
    osc.stop(now + 0.3)
  }

  // UI Click sound
  playClick() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(800, now)

    gain.gain.setValueAtTime(this.volume * 0.3, now)
    gain.gain.setTargetAtTime(0.01, now, 0.02)

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.start(now)
    osc.stop(now + 0.05)
  }

  // Scenario popup whoosh
  playPopup() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()

    osc.type = 'sawtooth'
    osc.frequency.setValueAtTime(100, now)
    osc.frequency.exponentialRampToValueAtTime(400, now + 0.15)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(200, now)
    filter.frequency.exponentialRampToValueAtTime(2000, now + 0.1)

    gain.gain.setValueAtTime(this.volume * 0.4, now)
    gain.gain.linearRampToValueAtTime(0, now + 0.2)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.start(now)
    osc.stop(now + 0.2)
  }

  // Points earned sparkle
  playPoints() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const notes = [523.25, 659.25, 783.99, 1046.50] // C5, E5, G5, C6

    notes.forEach((freq, i) => {
      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()

      osc.type = 'sine'
      osc.frequency.setValueAtTime(freq, now)

      const startTime = now + i * 0.08
      gain.gain.setValueAtTime(0, startTime)
      gain.gain.linearRampToValueAtTime(this.volume * 0.4, startTime + 0.02)
      gain.gain.setTargetAtTime(0.01, startTime + 0.05, 0.1)

      osc.connect(gain)
      gain.connect(this.audioContext.destination)

      osc.start(startTime)
      osc.stop(startTime + 0.3)
    })
  }

  // Footstep sound
  playFootstep() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()
    const filter = this.audioContext.createBiquadFilter()

    // Create noise-like footstep
    osc.type = 'triangle'
    osc.frequency.setValueAtTime(80 + Math.random() * 40, now)

    filter.type = 'lowpass'
    filter.frequency.setValueAtTime(500, now)

    gain.gain.setValueAtTime(this.volume * 0.15, now)
    gain.gain.setTargetAtTime(0.01, now, 0.03)

    osc.connect(filter)
    filter.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.start(now)
    osc.stop(now + 0.08)
  }

  // Hover sound
  playHover() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(600, now)

    gain.gain.setValueAtTime(this.volume * 0.1, now)
    gain.gain.setTargetAtTime(0.01, now, 0.01)

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.start(now)
    osc.stop(now + 0.03)
  }

  // Interaction available (near object)
  playNearby() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const osc = this.audioContext.createOscillator()
    const gain = this.audioContext.createGain()

    osc.type = 'sine'
    osc.frequency.setValueAtTime(440, now)
    osc.frequency.setValueAtTime(550, now + 0.1)

    gain.gain.setValueAtTime(this.volume * 0.2, now)
    gain.gain.linearRampToValueAtTime(0, now + 0.2)

    osc.connect(gain)
    gain.connect(this.audioContext.destination)

    osc.start(now)
    osc.stop(now + 0.2)
  }
}

