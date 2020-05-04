import Phaser from 'phaser';

/**
 * @class - Player class to manage players.
 */
export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, name) {
    super(scene, x, y);

    this.name = name;
    this.countdown = 8;
    this.hand = [];
    this.ready = false;

    // Add player's name above the avatar.
    this.nameText = this.scene.add.dom(x, y - 50, 'div', 'font-size: 16px;', this.name);
    this.nameText.setClassName('name');

    this.scene.add.existing(this);
  }

  /**
   * Remove a card from the player's hand, place it in play pile.
   *
   * @param {Card} cards - The card to be removed.
   * @param {Deck} deck - The deck that contains the pile of cards to add to.
   */
  removeCardFromHand(card, deck) {
    let cardToRemove = this.hand.splice(this.hand.indexOf(card), 1);
    deck.addCardToPlayPile(cardToRemove[0]);
  }

  /**
   * Add a card to the player's hand.
   *
   * @param {Card} card - The card to be added to the player's hand.
   */
  addCardToHand(card) {
    this.hand.push(card);
  }

  /**
   * Add text to show player is ready to smack down.
   */
  showReady() {
    this.ready = true;

    this.readyText = this.scene.add.dom(this.x, this.y - 80, 'div', 'font-size: 14px;', 'READY');
    this.readyText.setClassName('status');
  }

  /**
   * Remove ready text to show player is unready to smack down.
   */
  showUnready() {
    this.ready = false;

    this.readyText.destroy();
  }

  /**
   * Add text to show player is ready smack down.
   */
  showTurn() {
    this.turnText = this.scene.add.dom(this.x, this.y - 80, 'div', 'font-size: 14px;', 'MAKING TURN');
    this.turnText.setClassName('status');
  }

  /**
   * Add text to show player's countdown score.
   */
  showCountdown() {
    // Add player's countdown score below the players avatar.
    this.countdownText = this.scene.add.dom(this.x, this.y + 50, 'div', 'font-size: 12px;', `COUNTDOWN: ${this.countdown}`);
    this.countdownText.setClassName('countdown');
  }

  /**
   * Add text to show how many cards are in a player's hand.
   */
  showHandCount() {
    // Add player's hand count below the countdown score.
    this.handCountText = this.scene.add.dom(this.x, this.y + 65, 'div', 'font-size: 12px;', `CARDS: ${this.hand.length}`);
    this.handCountText.setClassName('hand-count');
  }

  /**
   * Will remove this in the future.
   */
  setPlayerTexture(playerNumber) {
    this.setTexture(`player_${playerNumber}`);
  }

  /**
   * Update player's countdown text to reflect current countdown score.
   */
  updateCountdown() {
    this.countdown--;
    this.countdownText.setText(`COUNTDOWN: ${this.countdown}`);
  }

  /**
   * Update player's hand count text to reflect total cards in hand.
   */
  updateHandCount(numberOfCards) {
    this.handCountText.setText(`CARDS: ${numberOfCards}`);
    }
  }

  /**
   * Clean up any player stuff from scene.
   */
  remove() {
    if (this.nameText) {
      this.nameText.destroy();
    }

    if (this.readyText) {
      this.readyText.destroy();
    }

    if (this.turnText) {
      this.turnText.destroy();
    }

    if (this.countdownText) {
      this.countdownText.destroy();
    }

    if (this.handCountText) {
      this.handCountText.destroy();
    }

    this.destroy(); // Cya dood!
  }
}
