export default class MainMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'MainMenuScene',
    });
  }

  preload() {

  }

  create() {
    this.cameras.main.backgroundColor.setTo(255, 192, 203);
    this.add.text(100, 100, 'Main Menu');

    this.input.once('pointerdown', function (event) {
      this.scene.start('GameScene');
    }, this);
  }

  update() {

  }
}
