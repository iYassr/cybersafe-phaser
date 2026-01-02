// Procedural sound generation using Web Audio API
export default class SoundManager {
  constructor(scene) {
    this.scene = scene
    this.audioContext = null
    this.enabled = true
    this.volume = 0.3
    this.musicVolume = 0.15
    this.musicPlaying = false
    this.currentArea = null
    this.musicOscillators = []
    this.musicGain = null
    this.init()
  }

  init() {
    try {
      this.audioContext = new (window.AudioContext || window.webkitAudioContext)()
      // Create master gain for music
      this.musicGain = this.audioContext.createGain()
      this.musicGain.gain.setValueAtTime(0, this.audioContext.currentTime)
      this.musicGain.connect(this.audioContext.destination)
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

  // ========== BACKGROUND MUSIC ==========
  startMusic(area = 'office') {
    if (!this.enabled || this.musicPlaying) return
    this.resume()

    this.musicPlaying = true
    this.currentArea = area

    // Different chord progressions for different areas
    const chords = {
      office: [
        [261.63, 329.63, 392.00], // C major
        [293.66, 369.99, 440.00], // D minor
        [329.63, 415.30, 493.88], // E minor
        [349.23, 440.00, 523.25], // F major
      ],
      server: [
        [220.00, 277.18, 329.63], // A minor
        [196.00, 246.94, 293.66], // G major
        [220.00, 277.18, 329.63], // A minor
        [164.81, 207.65, 246.94], // E minor
      ],
      break: [
        [293.66, 369.99, 440.00], // D minor
        [261.63, 329.63, 392.00], // C major
        [349.23, 440.00, 523.25], // F major
        [392.00, 493.88, 587.33], // G major
      ]
    }

    const progression = chords[area] || chords.office
    this.playMusicLoop(progression)
  }

  playMusicLoop(chords) {
    if (!this.musicPlaying) return

    const now = this.audioContext.currentTime
    const chordDuration = 2 // seconds per chord

    // Fade in music
    this.musicGain.gain.setTargetAtTime(this.musicVolume, now, 0.5)

    chords.forEach((chord, chordIndex) => {
      const chordStart = now + (chordIndex * chordDuration)

      chord.forEach((freq, noteIndex) => {
        const osc = this.audioContext.createOscillator()
        const noteGain = this.audioContext.createGain()
        const filter = this.audioContext.createBiquadFilter()

        // Use soft waveforms
        osc.type = noteIndex === 0 ? 'sine' : 'triangle'
        osc.frequency.setValueAtTime(freq, chordStart)

        // Low pass filter for warmth
        filter.type = 'lowpass'
        filter.frequency.setValueAtTime(800, chordStart)

        // Envelope
        noteGain.gain.setValueAtTime(0, chordStart)
        noteGain.gain.linearRampToValueAtTime(0.15, chordStart + 0.1)
        noteGain.gain.setValueAtTime(0.15, chordStart + chordDuration - 0.3)
        noteGain.gain.linearRampToValueAtTime(0, chordStart + chordDuration)

        osc.connect(filter)
        filter.connect(noteGain)
        noteGain.connect(this.musicGain)

        osc.start(chordStart)
        osc.stop(chordStart + chordDuration)

        this.musicOscillators.push(osc)
      })
    })

    // Loop the music
    const totalDuration = chords.length * chordDuration * 1000
    this.musicTimeout = setTimeout(() => {
      this.musicOscillators = []
      if (this.musicPlaying) {
        this.playMusicLoop(chords)
      }
    }, totalDuration - 100)
  }

  stopMusic() {
    if (!this.musicPlaying) return

    this.musicPlaying = false
    clearTimeout(this.musicTimeout)

    // Fade out
    const now = this.audioContext.currentTime
    this.musicGain.gain.setTargetAtTime(0, now, 0.3)

    // Stop oscillators
    this.musicOscillators.forEach(osc => {
      try { osc.stop(now + 0.5) } catch (e) {}
    })
    this.musicOscillators = []
  }

  changeArea(area) {
    if (this.currentArea === area) return
    this.stopMusic()
    setTimeout(() => this.startMusic(area), 500)
  }

  // Victory fanfare
  playVictory() {
    if (!this.enabled) return
    this.resume()

    const now = this.audioContext.currentTime
    const notes = [
      { freq: 523.25, time: 0 },     // C5
      { freq: 659.25, time: 0.15 },  // E5
      { freq: 783.99, time: 0.3 },   // G5
      { freq: 1046.50, time: 0.45 }, // C6
      { freq: 783.99, time: 0.6 },   // G5
      { freq: 1046.50, time: 0.75 }, // C6
    ]

    notes.forEach(({ freq, time }) => {
      const osc = this.audioContext.createOscillator()
      const gain = this.audioContext.createGain()

      osc.type = 'square'
      osc.frequency.setValueAtTime(freq, now + time)

      gain.gain.setValueAtTime(0, now + time)
      gain.gain.linearRampToValueAtTime(this.volume * 0.4, now + time + 0.05)
      gain.gain.setTargetAtTime(0.01, now + time + 0.1, 0.1)

      osc.connect(gain)
      gain.connect(this.audioContext.destination)

      osc.start(now + time)
      osc.stop(now + time + 0.3)
    })
  }
}

