import Phaser from 'phaser'
import { t, getCurrentLanguage } from '../data/translations.js'

export default class ResultsScene extends Phaser.Scene {
  constructor() {
    super({ key: 'ResultsScene' })
  }

  create() {
    const width = this.cameras.main.width
    const height = this.cameras.main.height
    const isArabic = getCurrentLanguage() === 'ar'

    // Background
    this.add.rectangle(width / 2, height / 2, width, height, 0x1a1a2e)

    // Get results
    const score = this.registry.get('score') || 0
    const totalScenarios = this.registry.get('totalScenarios') || 12
    const maxScore = totalScenarios * 100
    const percentage = Math.round((score / maxScore) * 100)

    // Determine grade and message
    let grade, message, color
    if (percentage >= 90) {
      grade = 'A+'
      message = isArabic ? 'ممتاز! أنت بطل الأمن السيبراني!' : 'Outstanding! You\'re a cybersecurity champion!'
      color = '#27ae60'
    } else if (percentage >= 80) {
      grade = 'A'
      message = isArabic ? 'عمل رائع! لديك وعي أمني قوي.' : 'Excellent work! You have strong security awareness.'
      color = '#2ecc71'
    } else if (percentage >= 70) {
      grade = 'B'
      message = isArabic ? 'عمل جيد! بعض المجالات تحتاج تحسين.' : 'Good job! A few areas could use improvement.'
      color = '#3498db'
    } else if (percentage >= 60) {
      grade = 'C'
      message = isArabic ? 'ناجح، لكن يُنصح بمراجعة مواد التدريب.' : 'Passing, but consider reviewing the training materials.'
      color = '#f39c12'
    } else {
      grade = 'D'
      message = isArabic ? 'يُنصح بمزيد من التدريب. الأمن مسؤولية الجميع!' : 'More training recommended. Security is everyone\'s responsibility!'
      color = '#e74c3c'
    }

    // Title
    this.add.text(width / 2, 60, t('trainingComplete'), {
      font: 'bold 36px monospace',
      fill: '#00ff88',
    }).setOrigin(0.5)

    // Score circle
    const circleGraphics = this.add.graphics()
    circleGraphics.lineStyle(12, 0x2c3e50)
    circleGraphics.arc(width / 2, 220, 100, 0, Math.PI * 2)
    circleGraphics.strokePath()

    // Animated score arc
    const scoreArc = this.add.graphics()
    const targetAngle = (percentage / 100) * Math.PI * 2

    this.tweens.addCounter({
      from: 0,
      to: targetAngle,
      duration: 1500,
      ease: 'Cubic.easeOut',
      onUpdate: (tween) => {
        scoreArc.clear()
        scoreArc.lineStyle(12, Phaser.Display.Color.HexStringToColor(color).color)
        scoreArc.beginPath()
        scoreArc.arc(width / 2, 220, 100, -Math.PI / 2, -Math.PI / 2 + tween.getValue())
        scoreArc.strokePath()
      },
    })

    // Grade text
    const gradeText = this.add.text(width / 2, 220, grade, {
      font: 'bold 64px monospace',
      fill: color,
    })
    gradeText.setOrigin(0.5)
    gradeText.setScale(0)

    this.tweens.add({
      targets: gradeText,
      scale: 1,
      duration: 500,
      delay: 800,
      ease: 'Back.easeOut',
    })

    // Score display
    this.add.text(width / 2, 350, `${t('score')}: ${score} / ${maxScore}`, {
      font: '28px monospace',
      fill: '#ffffff',
    }).setOrigin(0.5)

    this.add.text(width / 2, 390, `${percentage}%`, {
      font: 'bold 36px monospace',
      fill: color,
    }).setOrigin(0.5)

    // Message
    this.add.text(width / 2, 450, message, {
      font: '16px monospace',
      fill: '#aaaaaa',
      wordWrap: { width: 600 },
      align: 'center',
    }).setOrigin(0.5)

    // Security tips based on performance
    if (percentage < 80) {
      const rememberText = isArabic ? 'تذكر:' : 'Remember:'
      this.add.text(width / 2, 500, rememberText, {
        font: 'bold 16px monospace',
        fill: '#00d4ff',
      }).setOrigin(0.5)

      const tips = isArabic ? [
        '• تحقق دائمًا من الطلبات غير المتوقعة عبر القنوات الرسمية',
        '• لا توصل أبدًا أجهزة USB مجهولة',
        '• أبلغ عن رسائل البريد المشبوهة لقسم أمن المعلومات',
        '• استخدم كلمات مرور قوية وفريدة مع المصادقة الثنائية',
      ] : [
        '• Always verify unexpected requests through official channels',
        '• Never plug in unknown USB devices',
        '• Report suspicious emails to IT Security',
        '• Use strong, unique passwords with MFA',
      ]

      this.add.text(width / 2, 555, tips.join('\n'), {
        font: '13px monospace',
        fill: '#888888',
        align: 'center',
        lineSpacing: 6,
      }).setOrigin(0.5)
    }

    // Update high score
    const currentHighScore = parseInt(localStorage.getItem('cybersafe-highscore') || '0')
    if (score > currentHighScore) {
      localStorage.setItem('cybersafe-highscore', score.toString())

      const newRecordText = isArabic ? 'رقم قياسي جديد!' : 'NEW HIGH SCORE!'
      const newRecord = this.add.text(width / 2, 300, newRecordText, {
        font: 'bold 20px monospace',
        fill: '#ffd700',
      })
      newRecord.setOrigin(0.5)

      this.tweens.add({
        targets: newRecord,
        alpha: 0.5,
        duration: 500,
        yoyo: true,
        repeat: -1,
      })
    }

    // Buttons
    const playAgainBtn = this.add.rectangle(width / 2 - 120, height - 60, 180, 45, 0x3498db)
    playAgainBtn.setInteractive({ useHandCursor: true })

    const playAgainText = this.add.text(width / 2 - 120, height - 60, t('playAgain'), {
      font: 'bold 14px monospace',
      fill: '#ffffff',
    }).setOrigin(0.5)

    playAgainBtn.on('pointerover', () => {
      playAgainBtn.setFillStyle(0x2980b9)
      playAgainBtn.setScale(1.05)
    })
    playAgainBtn.on('pointerout', () => {
      playAgainBtn.setFillStyle(0x3498db)
      playAgainBtn.setScale(1)
    })
    playAgainBtn.on('pointerdown', () => {
      this.registry.set('score', 0)
      this.registry.set('completedScenarios', [])
      this.scene.start('OfficeScene')
    })

    const menuBtn = this.add.rectangle(width / 2 + 120, height - 60, 180, 45, 0x2c3e50)
    menuBtn.setInteractive({ useHandCursor: true })

    const menuText = this.add.text(width / 2 + 120, height - 60, t('backToMenu'), {
      font: 'bold 14px monospace',
      fill: '#ffffff',
    }).setOrigin(0.5)

    menuBtn.on('pointerover', () => {
      menuBtn.setFillStyle(0x34495e)
      menuBtn.setScale(1.05)
    })
    menuBtn.on('pointerout', () => {
      menuBtn.setFillStyle(0x2c3e50)
      menuBtn.setScale(1)
    })
    menuBtn.on('pointerdown', () => {
      this.scene.start('MenuScene')
    })

    // Confetti for high scores
    if (percentage >= 80) {
      this.createConfetti()
    }
  }

  createConfetti() {
    const colors = [0x00ff88, 0x00d4ff, 0xffd700, 0xff6b6b, 0xa855f7]

    for (let i = 0; i < 50; i++) {
      const x = Phaser.Math.Between(0, 1280)
      const delay = Phaser.Math.Between(0, 2000)

      const confetti = this.add.rectangle(
        x,
        -20,
        Phaser.Math.Between(8, 16),
        Phaser.Math.Between(8, 16),
        Phaser.Utils.Array.GetRandom(colors)
      )

      this.tweens.add({
        targets: confetti,
        y: 700,
        x: x + Phaser.Math.Between(-100, 100),
        rotation: Phaser.Math.Between(0, 6),
        duration: Phaser.Math.Between(2000, 4000),
        delay: delay,
        ease: 'Sine.easeIn',
        onComplete: () => confetti.destroy(),
      })
    }
  }
}
