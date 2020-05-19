import Phaser from 'phaser';

/**
 * @class - Player class to manage players.
 */
export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, id, name, textureMap) {
    super(scene, x, y);

    this.id = id;
    this.name = name;
    this.textureMap = textureMap;

    this.hand = [];
    this.countdown = 8;
    this.ready = false;

    this.setScale(0.25);

    // Add player's name above the avatar.
    this.nameText = this.scene.add.dom(x, y - 60, 'div', 'font-size: 16px;', this.name);
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

    this.readyText = this.scene.add.dom(this.x, this.y - 90, 'div', 'font-size: 14px;', 'READY');
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
    this.turnText = this.scene.add.dom(this.x, this.y - 90, 'div', 'font-size: 14px;', 'MAKING TURN');
    this.turnText.setClassName('status');
  }

  /**
   * Add text to show player's countdown score.
   */
  showCountdown() {
    // Add player's countdown score below the players avatar.
    this.countdownText = this.scene.add.dom(this.x, this.y + 55, 'div', 'font-size: 12px;', `COUNTDOWN: ${this.countdown}`);
    this.countdownText.setClassName('countdown');
  }

  /**
   * Add text to show how many cards are in a player's hand.
   */
  showHandCount() {
    // Add player's hand count below the countdown score.
    this.handCountText = this.scene.add.dom(this.x, this.y + 70, 'div', 'font-size: 12px;', `CARDS: ${this.hand.length}`);
    this.handCountText.setClassName('hand-count');
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
   *
   * @param {number} numberOfCards - number of cards left in a player's hand.
   */
  updateHandCount(numberOfCards) {
    this.handCountText.setText(`CARDS: ${numberOfCards}`);
  }

  /**
   * Provide an array of player UI elements that are attached to the player.
   *
   * @return {Phaser.DomElement[]} - Player UI elements.
   */
  getPlayerTextObjects() {
    let textObjects = [];

    Object.keys(this).forEach((property) => {
      if (property.includes('Text')) {
        textObjects.push(this[property]);
      }
    });

    return textObjects;
  }

  /**
   * Provide an array of UI elements that can be modified from a tween.
   *
   * @return {Phaser.DomElement[]} - Player UI elements.
   */
  getTweenTargets() {
    // Add the player reference to the targets list.
    let targets = [ this ];

    for (let textObj of this.getPlayerTextObjects()) {
      targets.push(textObj);
    }

    return targets;
  }

  /**
   * Remove all player stuff from scene.
   */
  remove() {
    for (let textObj of this.getPlayerTextObjects()) {
      textObj.destroy();
    }

    if (this.hand.length > 0) {
      for (let card of this.hand) {
        card.destroy();
      }
    }

    this.destroy(); // Cya dood!
  }

  /**
   * Custom toJSON function.
   *
   * @return {string} - A JSON representation of the card object.
   */
  toJSON() {
    let player = {
      id: this.id,
      name: this.name,
      textureMap: this.textureMap
    };

    return player;
  }
}
