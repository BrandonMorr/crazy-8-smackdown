import Card from "../objects/Card.js";
import Deck from "../objects/Deck.js";
import Player from "../objects/Player.js";

/**
 * @class - Game Scene which contains the core game loop.
 */

export default class GameScene extends Phaser.Scene {

  constructor(scene) {
    super({
      key: 'GameScene',
    });
  }

  /**
   * Basically need to load any assets here.
   */
  preload() {
    this.loadCards();
    this.loadPlayers();
    this.loadSounds();
  }

  /**
   * Generate the deck, setup players and initialize the game.
   */
  create() {

    this.deck = new Deck(this);

    this.players = [];
    this.players.push(new Player(this, 0, "test jarred", "green"));
    this.players.push(new Player(this, 1, "test willbert", "blue"));
    this.players.push(new Player(this, 2, "test frank", "green"));
    this.players.push(new Player(this, 3, "test kyle", "red"));

    this.initializeGame();

    this.input.once('pointerdown', function (event) {
      this.scene.start('MainMenuScene');
    }, this);
  }

  /**
   * Game logic will go in here.
   */
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
   * Do any game init within this function.
   */
  initializeGame() {
    // Shuffle player order to pick who goes first.
    this.players = Phaser.Utils.Array.Shuffle(this.players);
    console.log(`${this.players[0].name} goes first!`);

    // Deal out cards to the players.
    for (let i = 0; i <= 7; i++) {
      for (let player of this.players) {
        this.dealCardsToPlayer(player.id);
      }
    }

    // Add players to screen.
    for (let player of this.players) {
      this.add.existing(player);
    }
  }

  /**
   * Deal a card to the Player, tween the card to the player's hand.
   *
   * @param {Number} id - The ID of the player we are dealing to.
   * @param {Number} numberOfCards - The number of cards to deal to the player.
   */
  dealCardsToPlayer(id, numberOfCards = 1) {
    // We want to keep track of how many cards are left to deal if the deck
    // needs to be shuffled.
    for (let cardsLeftToDeal = numberOfCards; cardsLeftToDeal >= 1; cardsLeftToDeal--) {
      let cardToDeal = this.deck.drawPile.shift();

      if (cardToDeal) {
        // Deal the card to player.
        this.players[id].addCardToHand(cardToDeal);
      } else {
        // No cards left to draw, shuffle and try again.
        this.deck.shuffleDeck();
        // If there are enough cards left to deal, deal em'.
        if (this.deck.drawPile.length >= cardsLeftToDeal) {
          // Make sure to only deal the remainder (if there is enough).
          this.dealCardsToPlayer(id, cardsLeftToDeal);
        } else {
          console.log("No more cards left to deal!");
        }
      }
    }
  }
}
