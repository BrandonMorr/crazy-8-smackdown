/**
 * @class - MainMenuScene which contains menu stuff...?
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
    this.cameras.main.backgroundColor.setTo(0, 0, 0);

    this.titleText = this.add.text(400, 100, 'Crazy 8 Smackdown', { fontSize: '32px' });
    this.titleText.setOrigin(0.5);

    this.startButton = this.add.text(400, 300, 'Begin Smackdown');
    this.startButton.setOrigin(0.5);
    this.startButton.setInteractive();

    this.startButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    this.startButton.on('pointerover', () => {
      this.startButton.setTint(0xf91f5a);
    });

    this.startButton.on('pointerout', () => {
      this.startButton.clearTint();
    });
  }

  update() {

  }
}
