import Phaser from 'phaser'
import BootScene from './scenes/BootScene.js'
import MenuScene from './scenes/MenuScene.js'
import LevelSelectScene from './scenes/LevelSelectScene.js'
import StoryScene from './scenes/StoryScene.js'
import OfficeScene from './scenes/OfficeScene.js'
import DataCenterScene from './scenes/DataCenterScene.js'
import ExecutiveFloorScene from './scenes/ExecutiveFloorScene.js'
import ScenarioScene from './scenes/ScenarioScene.js'
import ResultsScene from './scenes/ResultsScene.js'
import SoundManager from './utils/SoundManager.js'

const config = {
  type: Phaser.AUTO,
  width: 1280,
  height: 720,
  parent: 'game-container',
  backgroundColor: '#1a1a2e',
  render: {
    antialias: true,
    pixelArt: false,
    roundPixels: false,
  },
  physics: {
    default: 'arcade',
    arcade: {
      gravity: { y: 0 },
      debug: false,
    },
  },
  input: {
    activePointers: 1,
  },
  scene: [BootScene, MenuScene, LevelSelectScene, StoryScene, OfficeScene, DataCenterScene, ExecutiveFloorScene, ScenarioScene, ResultsScene],
  scale: {
    mode: Phaser.Scale.FIT,
    autoCenter: Phaser.Scale.CENTER_BOTH,
    resolution: window.devicePixelRatio || 1,
  },
}

const game = new Phaser.Game(config)

// Global game state
game.registry.set('score', 0)
game.registry.set('completedScenarios', [])
game.registry.set('totalScenarios', 20)

// Initialize sound manager after game is ready
game.events.once('ready', () => {
  game.registry.set('soundManager', null) // Will be initialized on first user interaction
})

// Export SoundManager class for scene use
window.SoundManager = SoundManager
