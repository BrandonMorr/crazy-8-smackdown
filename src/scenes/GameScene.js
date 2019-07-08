import Phaser from 'phaser';
import Deck from "../objects/Deck.js";
import Player from "../objects/Player.js";
import Preload from "../utilities/Preload.js";

/**
 * @class - Game Scene which contains the core game loop.
 */
export default class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'GameScene',
    });
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
    this.gameOver = false;
    this.playerTurn = 3;
    this.checkHandForPlayableCards = true;

    this.deck = new Deck(this);

    this.players = [];
    this.players.push(new Player(this, (this.sys.game.config.width - 100), 100, "jarred", "green"));
    this.players.push(new Player(this, (this.sys.game.config.width - 100), 200, "willbert", "blue"));
    this.players.push(new Player(this, (this.sys.game.config.width - 100), 300, "frank", "purple"));
    this.players.push(new Player(this, 100, 500, "brandon", "yellow"));

    this.initializeGame();
    this.buildWildCardDialog();
    this.addRestartButton();
  }

  /**
   * Game logic will go in here.
   */
  update() {
    // Check if the game is over.
    this.checkGameOver();
    // Check if the last card has changed.
    if (this.checkLastPlayCardChange()) {
      // A turn has been made, let's make sure to make all the player's cards
      // non-interactive.
      for (let card of this.players[this.playerTurn].hand) {
        card.removeAllListeners();
      }

      // Check for wildcard.
      if (this.currentCardInPlay.value == this.players[this.playerTurn].countdown) {
        this.wildCardDialogContainer.visible = true;
      }
    }

    // Check the player hand for playable cards.
    if (this.checkHandForPlayableCards) {
      for (let card of this.players[this.playerTurn].hand) {
        let currentCardInPlay = this.deck.getLastPlayCard();

        if (card.value == currentCardInPlay.value || card.suit == this.currentSuitInPlay || card.value == this.players[this.playerTurn].countdown) {
          this.makeCardPlayable(card, this.players[this.playerTurn]);
        }
      }
      // Flag that the hand has been checked.
      this.checkHandForPlayableCards = false;
    }
  }

  /**
   * Do any game init within this function.
   */
  initializeGame() {
    // Add players to screen.
    for (let player of this.players) {
      this.add.existing(player);
    }
    // Deal out cards to the players.
    let offset = 0;

    for (let i = 0; i <= 7; i++) {
      for (let player of this.players) {
        // Deal the card to player.
        this.dealCardsToPlayer(player);
        // XXX: Gotta move this into something more dynamic... will do for now.
        // Tween the card game object and reveal what is in the hand.
        if (player.name === 'brandon') {
          this.tweens.add({
            targets: player.hand[i],
            x: (225 + offset),
            y: 500,
            ease: 'Linear',
            duration: 250,
            onComplete: function () {
              player.hand[i].faceCardUp();
            }
          });

          offset = offset + 50;
        }
      }
    }
    // Shuffle player order to determine who goes first.
    // this.players = Phaser.Utils.Array.Shuffle(this.players);
    // console.log(`${this.players[0].name} goes first!`);

    // Deal out the first card to the play pile.
    this.dealCardFromDrawToPlayPile();
  }

  /**
   * Determine if the game is over by checking each player's countdown score, 0
   * is considered game over.
   */
  checkGameOver() {
    for (let player of this.players) {
      // If the countdown is at 0, that's it... GAME OVER!
      if (player.countdown === 0) {
        this.gameOver = true;
        console.log(`${player.name} is the winner!`);
      }
    }
  }

  /**
   * Deal a card to the Player, tween the card to the player's hand.
   *
   * @param {Player} player - The player we are dealing to.
   * @param {Number} numberOfCards - The number of cards to deal to the player.
   */
  dealCardsToPlayer(player, numberOfCards = 1) {
    // We want to keep track of how many cards are left to deal if the deck
    // needs to be shuffled.
    for (let cardsLeftToDeal = numberOfCards; cardsLeftToDeal >= 1; cardsLeftToDeal--) {
      let cardToDeal = this.deck.drawPile.shift();

      if (cardToDeal) {
        // Deal the card to player.
        player.addCardToHand(cardToDeal);
      } else {
        // No cards left to draw, shuffle and try again.
        this.deck.shuffleDeck();
        // If there are enough cards left to deal, deal em'.
        if (this.deck.drawPile.length >= cardsLeftToDeal) {
          // Make sure to only deal the remainder (if there is enough).
          this.dealCardsToPlayer(player, cardsLeftToDeal);
        } else {
          console.log("No more cards left to deal!");
        }
      }
    }
  }

  /**
   * Deal a card from the draw deck to the play pile.
   */
  dealCardFromDrawToPlayPile() {
    // Shift out a card from the draw pile.
    let cardToDeal = this.deck.drawPile.shift();
    // Place card on the top of the play pile.
    this.deck.playPile.unshift(cardToDeal);
    // Set the first card in play pile as the last card played.
    this.currentCardInPlay = cardToDeal;
    // Set the suit in play pile as the last card's suit.
    this.currentSuitInPlay = cardToDeal.suit;
    // Move the card to the playPile zone.
    this.tweens.add({
      targets: cardToDeal,
      x: '+=125',
      ease: 'Linear',
      duration: 250,
      onComplete: () => {
        cardToDeal.faceCardUp();
      }
    });
  }

  /**
   * Check to see if the last card has changed.
   *
   * @return {Boolean} - True if the card has changed, false otherwise.
   */
  checkLastPlayCardChange() {
    if (this.currentCardInPlay.name != this.deck.getLastPlayCard().name) {
      this.currentCardInPlay = this.deck.getLastPlayCard();
      this.currentSuitInPlay = this.deck.getLastPlayCard().suit;

      return true;
    }

    return false;
  }

  /**
   * Make a card playable by adding click/hover listeners.
   *
   * @param {Card} card - The card to make playable.
   */
  makeCardPlayable(card, player) {
    card.setInteractive();
    // When the user clicks send the card to the play pile and do other stuff.
    card.on('pointerdown', () => {
      // Remove all the listeners.
      card.removeAllListeners();
      // Remove tint.
      card.clearTint();
      // Set the depth of all playPile cards to 0.
      for (let playCard of this.deck.playPile) {
        playCard.setDepth(0);
      }
      // Set the depth of the card to played to 1.
      card.setDepth(1);
      // Move the card to the play pile.
      this.tweens.add({
        targets: card,
        x: 250,
        y: 125,
        ease: 'Linear',
        duration: 250,
      });
      // Remove the card from hand, move into the play pile.
      player.removeCardFromHand(card, this.deck);
    });
    // When the user hovers the cursor over the card, set a tint and raise y.
    card.on('pointerover', () => {
      // Set a tint to show card is playable.
      card.setTint(0xe3e3e3);
      // Move card up slightly.
      this.tweens.add({
        targets: card,
        y: 450,
        ease: 'Linear',
        duration: 250,
      });
    });
    // When the user's cursor leaves the card, remove the tint and lower y.
    card.on('pointerout', () => {
      // Remove tint.
      card.clearTint();
      // Move the card back into hand.
      this.tweens.add({
        targets: card,
        y: 500,
        ease: 'Linear',
        duration: 250,
      });
    });
  }

  /**
   * Constructs a wildcard dialog box.
   */
  buildWildCardDialog() {
    // initialize container object to hold all the dialogue text.
    this.wildCardDialogContainer = this.add.container(0, 0);
    this.wildCardDialogContainer.visible = false;

    // Add a background for the message box.
    let wildCardDialogBackground = this.add.graphics();
    wildCardDialogBackground.fillStyle(0xbdbdbd, 0.8);
    wildCardDialogBackground.fillRoundedRect(200, 250, 400, 150, 4);

    this.wildCardDialogContainer.add(wildCardDialogBackground);

    // Show message text in the center of the screen.
    let wildCardText = this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2) - 20, 'Wild card played, choose a new suit:');
    wildCardText.setOrigin(0.5);

    this.wildCardDialogContainer.add(wildCardText);

    const suits = [ "hearts", "diamonds", "spades", "clubs" ];
    let offset = 10;

    for (let suit of suits) {
      let wildCardOption = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 2) + offset, suit);
      wildCardOption.setOrigin(0.5);
      wildCardOption.setInteractive();

      wildCardOption.on('pointerdown', () => {
        this.currentSuitInPlay = suit;
        this.checkHandForPlayableCards = true;
        this.wildCardDialogContainer.visible = false;
      });

      wildCardOption.on('pointerover', () => {
        wildCardOption.setTint(0xe3e3e3);
      });

      wildCardOption.on('pointerout', () => {
        wildCardOption.clearTint();
      });

      this.wildCardDialogContainer.add(wildCardOption);

      offset += 20;
    }
  }

  /**
   * Add a restart button to the scene, used for debugging.
   */
  addRestartButton() {
    let restartButton = this.add.text(700, 525, 'Restart?');
    restartButton.setOrigin(0.5);
    restartButton.setInteractive();

    restartButton.on('pointerdown', () => {
      this.scene.restart();
    });

    restartButton.on('pointerover', () => {
      restartButton.setTint(0x3bceac);
    });

    restartButton.on('pointerout', () => {
      restartButton.clearTint();
    });
  }
}
