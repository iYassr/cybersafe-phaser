import Phaser from 'phaser'
import { t } from '../data/translations.js'

export default class ScenarioScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ScenarioScene' })
  }

  init(data) {
    this.scenario = data.scenario
    this.returnScene = data.returnScene
    this.selectedChoice = null
    this.answered = false

    // Get translated scenario content
    const scenarioId = this.scenario.id
    this.translatedScenario = t(`scenarios.${scenarioId}`)

    // Get sound manager
    this.soundManager = this.registry.get('soundManager')
  }

  getPreviewTexture() {
    // Map scenario type/id to preview texture
    const typeToPreview = {
      email: 'email-preview',
      phone: 'phone-preview',
      network: 'wifi-preview',
    }

    // Special cases based on scenario id
    const idToPreview = {
      'usb-drive': 'usb-preview',
      'software-download': 'usb-preview',
      tailgating: 'door-preview',
      'server-access': 'server-preview',
      'clean-desk': 'doc-preview',
      'shoulder-surfing': 'doc-preview',
    }

    return idToPreview[this.scenario.id] || typeToPreview[this.scenario.type] || 'email-preview'
  }

  getPreviewLabel() {
    const labels = {
      email: '📧 EMAIL RECEIVED',
      phone: '📞 INCOMING CALL',
      device: '💾 DEVICE FOUND',
      physical: '🚪 SITUATION',
      network: '📡 NETWORK',
    }

    const idLabels = {
      'usb-drive': '💾 FOUND IN PARKING LOT',
      'software-download': '💻 SOFTWARE NEEDED',
      tailgating: '🚪 AT THE ENTRANCE',
      'server-access': '🖥️ SERVER ROOM',
      'clean-desk': '📄 AT THE PRINTER',
      'shoulder-surfing': '👀 BREAK ROOM',
    }

    return idLabels[this.scenario.id] || labels[this.scenario.type] || '⚠️ ALERT'
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height

    // Dim background with fade in
    this.overlay = this.add.rectangle(width / 2, height / 2, width, height, 0x000000, 0)
    this.tweens.add({
      targets: this.overlay,
      fillAlpha: 0.8,
      duration: 300,
      ease: 'Power2',
    })

    // Dialog container for slide animation
    this.dialogContainer = this.add.container(width / 2, height + 300)

    // Dialog box
    const dialogBg = this.add.image(0, 0, 'dialog')
    this.dialogContainer.add(dialogBg)

    // Slide in animation
    this.tweens.add({
      targets: this.dialogContainer,
      y: height / 2,
      duration: 400,
      ease: 'Back.easeOut',
      onStart: () => {
        if (this.soundManager) this.soundManager.playPopup()
      }
    })

    // === LEFT SIDE: Visual Preview ===
    const previewTexture = this.getPreviewTexture()
    const previewX = -300

    // Preview background frame
    const previewFrame = this.add.rectangle(previewX, -40, 300, 230, 0x0a0a15)
    previewFrame.setStrokeStyle(2, 0x00ff88)
    this.dialogContainer.add(previewFrame)

    // Preview image
    const previewImage = this.add.image(previewX, -40, previewTexture)
    previewImage.setScale(1)
    this.dialogContainer.add(previewImage)

    // Preview label
    const previewLabel = this.add.text(previewX, -170, this.getPreviewLabel(), {
      font: 'bold 12px monospace',
      fill: '#00ff88',
      backgroundColor: '#0a0a15',
      padding: { x: 8, y: 4 },
    })
    previewLabel.setOrigin(0.5)
    this.dialogContainer.add(previewLabel)

    // === RIGHT SIDE: Content ===
    const contentX = 150

    // Scenario type icon and title
    const iconMap = {
      email: '📧',
      phone: '📞',
      physical: '🚪',
      device: '💾',
      network: '📡',
    }
    const icon = iconMap[this.scenario.type] || '⚠️'

    // Use translated title
    const title = this.translatedScenario?.title || this.scenario.title
    const titleText = this.add.text(contentX, -230, `${icon} ${title}`, {
      font: 'bold 22px monospace',
      fill: '#00ff88',
    })
    titleText.setOrigin(0.5)
    this.dialogContainer.add(titleText)

    // Use translated description
    const description = this.translatedScenario?.description || this.scenario.context
    const contextText = this.add.text(contentX, -180, description, {
      font: '13px monospace',
      fill: '#ffffff',
      wordWrap: { width: 480 },
      align: 'left',
      lineSpacing: 5,
    })
    contextText.setOrigin(0.5, 0)
    this.dialogContainer.add(contextText)

    // Question prompt
    const questionText = this.add.text(contentX, -40, 'What do you do?', {
      font: 'bold 16px monospace',
      fill: '#00d4ff',
    })
    questionText.setOrigin(0.5)
    this.dialogContainer.add(questionText)

    // Get translated choices
    const choices = this.translatedScenario?.choices || this.scenario.choices

    // Choice buttons
    this.choiceButtons = []
    this.choiceTexts = []

    choices.forEach((choice, index) => {
      const y = 10 + index * 55

      // Button background
      const btn = this.add.rectangle(contentX, y, 500, 48, 0x2c3e50)
      btn.setInteractive({ useHandCursor: true })
      btn.choiceIndex = index
      this.dialogContainer.add(btn)

      // Choice letter indicator
      const letterBg = this.add.circle(contentX - 220, y, 14, 0x3498db)
      this.dialogContainer.add(letterBg)

      const letter = this.add.text(contentX - 220, y, String.fromCharCode(65 + index), {
        font: 'bold 14px monospace',
        fill: '#ffffff',
      })
      letter.setOrigin(0.5)
      this.dialogContainer.add(letter)

      // Button text
      const txt = this.add.text(contentX + 10, y, choice.text, {
        font: '13px monospace',
        fill: '#ffffff',
        wordWrap: { width: 440 },
      })
      txt.setOrigin(0.5)
      this.dialogContainer.add(txt)

      // Hover effects
      btn.on('pointerover', () => {
        if (!this.answered) {
          btn.setFillStyle(0x3498db)
          letterBg.setFillStyle(0x00ff88)
          this.tweens.add({
            targets: btn,
            scaleX: 1.02,
            duration: 100,
          })
        }
      })

      btn.on('pointerout', () => {
        if (!this.answered && this.selectedChoice !== index) {
          btn.setFillStyle(0x2c3e50)
          letterBg.setFillStyle(0x3498db)
        }
        this.tweens.add({
          targets: btn,
          scaleX: 1,
          duration: 100,
        })
      })

      btn.on('pointerdown', () => {
        if (!this.answered) {
          this.selectChoice(index)
        }
      })

      this.choiceButtons.push(btn)
      this.choiceTexts.push(txt)
      btn.letterBg = letterBg
    })

    // Submit button (hidden initially) - positioned below choices
    const submitY = 230
    this.submitBtn = this.add.rectangle(contentX, submitY, 200, 45, 0x27ae60)
    this.submitBtn.setInteractive({ useHandCursor: true })
    this.submitBtn.setVisible(false)
    this.dialogContainer.add(this.submitBtn)

    this.submitText = this.add.text(contentX, submitY, 'SUBMIT', {
      font: 'bold 18px monospace',
      fill: '#ffffff',
    })
    this.submitText.setOrigin(0.5)
    this.submitText.setVisible(false)
    this.dialogContainer.add(this.submitText)

    this.submitBtn.on('pointerover', () => {
      this.submitBtn.setFillStyle(0x2ecc71)
      this.submitBtn.setScale(1.05)
    })

    this.submitBtn.on('pointerout', () => {
      this.submitBtn.setFillStyle(0x27ae60)
      this.submitBtn.setScale(1)
    })

    this.submitBtn.on('pointerdown', () => {
      this.submitAnswer()
    })

    // Feedback container (hidden initially)
    this.feedbackContainer = this.add.container(0, 0)
    this.feedbackContainer.setVisible(false)
    this.dialogContainer.add(this.feedbackContainer)

    // Continue button (for after feedback) - on right side, same Y as submit
    this.continueBtn = this.add.rectangle(150, 230, 200, 45, 0x3498db)
    this.continueBtn.setInteractive({ useHandCursor: true })
    this.feedbackContainer.add(this.continueBtn)

    this.continueText = this.add.text(150, 230, t('continue'), {
      font: 'bold 18px monospace',
      fill: '#ffffff',
    })
    this.continueText.setOrigin(0.5)
    this.feedbackContainer.add(this.continueText)

    this.continueBtn.on('pointerover', () => {
      this.continueBtn.setScale(1.05)
    })
    this.continueBtn.on('pointerout', () => {
      this.continueBtn.setScale(1)
    })
    this.continueBtn.on('pointerdown', () => {
      this.closeScenario()
    })

    // Screen flash overlay for effects
    this.flashOverlay = this.add.rectangle(width / 2, height / 2, width, height, 0xffffff, 0)
    this.flashOverlay.setDepth(100)

    // Keyboard support
    this.input.keyboard.on('keydown-ESC', () => {
      if (this.answered) {
        this.closeScenario()
      }
    })
  }

  selectChoice(index) {
    // Play click sound
    if (this.soundManager) this.soundManager.playClick()

    // Deselect all
    this.choiceButtons.forEach((btn) => {
      btn.setFillStyle(0x2c3e50)
      if (btn.letterBg) btn.letterBg.setFillStyle(0x3498db)
    })

    // Select this one
    this.selectedChoice = index
    this.choiceButtons[index].setFillStyle(0x3498db)
    if (this.choiceButtons[index].letterBg) {
      this.choiceButtons[index].letterBg.setFillStyle(0x00ff88)
    }

    // Show submit button
    this.submitBtn.setVisible(true)
    this.submitText.setVisible(true)
  }

  submitAnswer() {
    if (this.selectedChoice === null) return

    this.answered = true

    // Get translated choices
    const choices = this.translatedScenario?.choices || this.scenario.choices
    const choice = choices[this.selectedChoice]
    const correct = choice.correct

    // Play sound
    if (this.soundManager) {
      if (correct) {
        this.soundManager.playCorrect()
      } else {
        this.soundManager.playWrong()
      }
    }

    // Hide submit button
    this.submitBtn.setVisible(false)
    this.submitText.setVisible(false)

    // Screen effect based on result
    if (correct) {
      // Green flash for correct
      this.flashOverlay.setFillStyle(0x27ae60)
      this.tweens.add({
        targets: this.flashOverlay,
        fillAlpha: 0.3,
        duration: 100,
        yoyo: true,
        onComplete: () => this.flashOverlay.setAlpha(0)
      })
    } else {
      // Red flash and screen shake for wrong
      this.flashOverlay.setFillStyle(0xe74c3c)
      this.tweens.add({
        targets: this.flashOverlay,
        fillAlpha: 0.4,
        duration: 100,
        yoyo: true,
        onComplete: () => this.flashOverlay.setAlpha(0)
      })
      // Screen shake
      this.cameras.main.shake(300, 0.01)
    }

    // Highlight correct/wrong with animation
    this.choiceButtons.forEach((btn, index) => {
      btn.disableInteractive()
      if (index === this.selectedChoice) {
        btn.setFillStyle(correct ? 0x27ae60 : 0xe74c3c)
        // Pulse animation
        this.tweens.add({
          targets: btn,
          scaleX: 1.05,
          scaleY: 1.1,
          duration: 150,
          yoyo: true,
        })
      }
      if (choices[index].correct && index !== this.selectedChoice) {
        btn.setFillStyle(0x27ae60)
        btn.setAlpha(0.6)
      }
    })

    // Show result icon with bounce (on the preview image)
    const resultIcon = this.add.image(-300, -40, correct ? 'correct' : 'wrong')
    resultIcon.setScale(0)
    this.dialogContainer.add(resultIcon)

    this.tweens.add({
      targets: resultIcon,
      scale: 1.2,
      duration: 200,
      ease: 'Back.easeOut',
      onComplete: () => {
        this.tweens.add({
          targets: resultIcon,
          scale: 1,
          duration: 100,
        })
      }
    })

    // Show feedback
    this.showFeedback(choice.feedback, correct)
  }

  showFeedback(feedback, correct) {
    // Feedback appears on the left side where preview was
    const feedbackX = -300

    // Feedback background
    const feedbackBg = this.add.rectangle(feedbackX, 80, 300, 180, correct ? 0x1a4d2e : 0x4d1a1a, 0.95)
    feedbackBg.setStrokeStyle(3, correct ? 0x27ae60 : 0xe74c3c)
    this.feedbackContainer.add(feedbackBg)

    // Feedback title - translated
    const feedbackTitle = this.add.text(feedbackX, 20, correct ? t('correct') : t('incorrect'), {
      font: 'bold 22px monospace',
      fill: correct ? '#27ae60' : '#e74c3c',
    })
    feedbackTitle.setOrigin(0.5)
    this.feedbackContainer.add(feedbackTitle)

    // Feedback text
    const feedbackText = this.add.text(feedbackX, 80, feedback, {
      font: '12px monospace',
      fill: '#ffffff',
      wordWrap: { width: 270 },
      align: 'center',
      lineSpacing: 4,
    })
    feedbackText.setOrigin(0.5)
    this.feedbackContainer.add(feedbackText)

    // Points display
    if (correct) {
      const pointsText = this.add.text(feedbackX, 155, `+${this.scenario.points} pts`, {
        font: 'bold 28px monospace',
        fill: '#ffd700',
      })
      pointsText.setOrigin(0.5)
      this.feedbackContainer.add(pointsText)

      // Play points sound
      if (this.soundManager) this.soundManager.playPoints()

      // Points animation
      this.tweens.add({
        targets: pointsText,
        scaleX: 1.2,
        scaleY: 1.2,
        duration: 200,
        yoyo: true,
      })
    }

    // Show feedback container
    this.feedbackContainer.setVisible(true)
    this.feedbackContainer.setAlpha(0)
    this.tweens.add({
      targets: this.feedbackContainer,
      alpha: 1,
      duration: 300,
    })
  }

  closeScenario() {
    // Get translated choices for correct answer check
    const choices = this.translatedScenario?.choices || this.scenario.choices
    const choice = choices[this.selectedChoice]

    // Slide out animation
    this.tweens.add({
      targets: this.dialogContainer,
      y: this.cameras.main.height + 400,
      duration: 300,
      ease: 'Back.easeIn',
    })

    // Fade out overlay
    this.tweens.add({
      targets: this.overlay,
      fillAlpha: 0,
      duration: 300,
      onComplete: () => {
        // Emit event to parent scene
        this.scene.get(this.returnScene).events.emit('scenarioComplete', {
          scenarioId: this.scenario.id,
          correct: choice.correct,
          points: this.scenario.points,
        })

        // Resume parent scene and close this one
        this.scene.resume(this.returnScene)
        this.scene.stop()
      }
    })
  }
}
