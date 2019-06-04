import Card from "../objects/Card.js";
import Deck from "../objects/Deck.js";
import Player from "../objects/Player.js";

export default class GameScene extends Phaser.Scene {

  constructor(scene) {
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
    // Generate deck of cards.
    this.deck = new Deck(this);

    this.players = [];

    this.players.push(new Player(this, 1, "green"));
    this.players.push(new Player(this, 2, "blue"));

    for (let player of this.players) {
      this.add.existing(player);
    }

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

  /**
   * Deal a card to the Player, tween the card to the player's hand.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   * @param {Player} player - The player we are dealing to.
   */
  dealToPlayer(game, player) {
    const cardToAdd = this.deck.pop();
    // XXX: this will be gross, but will work for now.
    const xPos = (player.id * 500) + (player.hand.length * 100);

    if (cardToAdd) {
      player.addCard(cardToAdd);

      const tween = game.add.tween(cardToAdd).to({ x: xPos, y: 400 }, 400, Phaser.Easing.Cubic.In);
      tween.onComplete.add(function() { cardToAdd.faceCardUp(); }, this);
      tween.start();
    } else {
      // No more cards, shuffle pile.
    }
  }
}
