export default class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'GameScene',
    });
  }

  preload() {
    this.loadCards();
    this.loadPlayers();
    this.loadSounds();
  }

  create() {
    this.add.text(100, 100, 'Game Scene!');

    this.input.once('pointerdown', function (event) {
      this.scene.start('MainMenuScene');
    }, this);
  }

  update() {

  }

  /**
   * Load card assets.
   */
  loadCards() {
    const names = [ "a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "k", "q" ];
    const suits = [ "hearts", "diamonds", "spades", "clubs" ];

    for (const suit of suits) {
      for (const name of names) {
        const cardName = `${suit}_${name}`;

        this.load.image(cardName, "assets/cards/" + cardName + ".png");
      }
    }

    this.load.image("back_blue", "assets/cards/back_blue.png");
    this.load.image("back_green", "assets/cards/back_green.png");
    this.load.image("back_red", "assets/cards/back_red.png");
  }

  /**
   * Load player assets.
   */
  loadPlayers() {
    const colors = [ "black", "blue", "green", "purple", "red", "white", "yellow" ];

    for (const color of colors) {
      this.load.image(`player_${color}`, `assets/player/player_${color}.png`);
    }
  }

  /**
   * Load sound assets.
   */
  loadSounds() {
    const sounds = [ "place", "slide" ];

    for (const sound of sounds) {
      for (let i = 1; i <= 3; i++) {
        this.load.audio(`card_${sound}_${i}`, `assets/sounds/card_${sound}_${i}.ogg`);
      }
    }
  }
}
