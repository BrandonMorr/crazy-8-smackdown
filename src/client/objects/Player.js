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

    this.nameText = this.scene.add.dom(x, y - 60, 'div', 'font-size: 20px;', name)
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
   * Add text to show player is ready smack down.
   */
  showPlayerReady() {
    this.readyText = this.scene.add.dom(this.x, this.y + 55, 'div', 'font-size: 14px;', 'READY');
    this.readyText.setClassName('status');

    this.ready = true;
  }

  /**
   * Add text to show player is ready smack down.
   */
  showPlayerTurn() {
    this.turnText = this.scene.add.dom(this.x, this.y + 55, 'div', 'font-size: 14px;', 'MAKING TURN');
    this.turnText.setClassName('status');
  }

  /**
   * Will remove this in the future.
   */
  setPlayerTexture(playerNumber) {
    this.setTexture(`player_${playerNumber}`);
  }

  /**
   * Clean up any player stuff from scene.
   */
  removePlayer() {
    if (this.nameText) {
      this.nameText.destroy();
    }

    if (this.readyText) {
      this.readyText.destroy();
    }

    if (this.turnText) {
      this.turnText.destroy();
    }

    this.destroy(); // Cya dood!
  }
}
