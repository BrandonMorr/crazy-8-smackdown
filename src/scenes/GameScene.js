import Card from "../objects/Card.js";
import Deck from "../objects/Deck.js";
import Player from "../objects/Player.js";
import Preload from "../utilities/Preload.js";

/**
 * @class - Game Scene which contains the core game loop.
 */

export default class GameScene extends Phaser.Scene {

  constructor(scene) {
    super({
      key: 'GameScene',
    });

    this.gameOver = false;
  }

  /**
   * Basically need to load any assets here.
   *
   * @see Preload.js for preload functions.
   */
  preload() {
    Preload.loadCards(this);
    Preload.loadPlayers(this);
    Preload.loadSounds(this);
  }

  /**
   * Generate the deck, setup players and initialize the game.
   */
  create() {
    this.deck = new Deck(this);

    this.players = [];
    this.players.push(new Player(this, 700, 100, 0, "jarred", "green"));
    this.players.push(new Player(this, 700, 200, 1, "willbert", "blue"));
    this.players.push(new Player(this, 700, 300, 2, "frank", "purple"));
    this.players.push(new Player(this, 100, 500, 3, "brandon", "yellow"));

    this.initializeGame();

    // Restart button... using for debug right now.
    this.restartButton = this.add.text(700, 525, 'Restart?');
    this.restartButton.setOrigin(0.5);
    this.restartButton.setInteractive();

    this.restartButton.on('pointerdown', () => {
      this.scene.restart('GameScene');
    });

    this.restartButton.on('pointerover', () => {
      this.restartButton.setTint(0x3bceac);
    });

    this.restartButton.on('pointerout', () => {
      this.restartButton.clearTint();
    });
  }

  /**
   * Game logic will go in here.
   */
  update() {

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
