import Phaser from 'phaser';
import FontLoader from '../utilities/FontLoader';

/**
 * @class - It's da main menu scene!
 */
export default class MainMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'MainMenuScene',
    });
  }

  preload() {

  }

  create() {
    // Currently does jack shit...
    FontLoader.loadWebFontOpenSans();

    this.addTitleText()
    this.addStartGameButton();
    this.addPlayerSetupButton();
  }

  update() {

  }

  /**
   * Add title text to the scene.
   */
  addTitleText() {
    this.titleTextBackground = this.add.graphics();
    this.titleTextBackground.fillRoundedRect(200, 75, 400, 50, 6);
    this.titleTextBackground.fillStyle(0x7FFFD4, 0.5);

    this.titleTextBackgroundBorder = this.add.graphics();
    this.titleTextBackgroundBorder.lineStyle(4, 0x000000);
    this.titleTextBackgroundBorder.strokeRoundedRect(200, 75, 400, 50, 6);

    this.titleText = this.add.text(400, 100, 'Crazy 8 Smackdown', { fontFamily: 'Open Sans', fontSize: '28px', fontStyle: 'bold', color: '0x000000' });
    this.titleText.setOrigin(0.5);
  }

  /**
   * Add a start game button that starts the game scene (GameScene.js).
   */
  addStartGameButton() {
    this.startButtonBackground = this.add.graphics();
    this.startButtonBackground.fillRoundedRect(300, 280, 200, 40, 6);
    this.startButtonBackground.fillStyle(0xFFB0B0, 0.5);
    this.startButtonBackground.closePath();

    this.startButtonBackgroundBorder = this.add.graphics();
    this.startButtonBackgroundBorder.lineStyle(4, 0x000000);
    this.startButtonBackgroundBorder.strokeRoundedRect(300, 280, 200, 40, 6);

    this.startButton = this.add.text(400, 300, 'Start Game', { fontFamily: 'Open Sans', fontSize: '18px', fontStyle: 'bold', color: '0x000000' });
    this.startButton.setOrigin(0.5);
    this.startButton.setInteractive();

    this.startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    this.startButton.on('pointerover', () => {
      this.startButtonBackground.setAlpha(0.5);
    });

    this.startButton.on('pointerout', () => {
      this.startButtonBackground.setAlpha(1);
    });
  }

  /**
   * Add a player setup button that starts the player setup scene
   * (PlayerSetupScene.js).
   */
  addPlayerSetupButton() {
    this.setupButtonBackground = this.add.graphics();
    this.setupButtonBackground.fillRoundedRect(300, 350, 200, 40, 6);
    this.setupButtonBackground.fillStyle(0x6356c7, 0.5);

    this.setupButtonBackgroundBorder = this.add.graphics();
    this.setupButtonBackgroundBorder.lineStyle(4, 0x000000);
    this.setupButtonBackgroundBorder.strokeRoundedRect(300, 350, 200, 40, 6);

    this.setupButton = this.add.text(400, 370, 'Player Setup', { fontFamily: 'Open Sans', fontSize: '18px', fontStyle: 'bold', color: '0x000000' });
    this.setupButton.setOrigin(0.5);
    this.setupButton.setInteractive();

    this.setupButton.on('pointerdown', () => {
      this.scene.start('PlayerSetupScene');
    });

    this.setupButton.on('pointerover', () => {
      this.setupButtonBackground.setAlpha(0.5);
    });

    this.setupButton.on('pointerout', () => {
      this.startButtonBackground.setAlpha(1);
    });
  }
}
