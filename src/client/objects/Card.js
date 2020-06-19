import Phaser from 'phaser';

/**
 * @class - Card class to store suit/value information.
 */
export default class Card extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, suit, value, name) {
    super(scene, x, y);

    this.suit = suit;
    this.value = value;
    this.name = name;
    this.cardBack = 'red';

    this.setOrigin(0.5);
    this.setScale(0.75);
    this.faceUp();

    this.scene.add.existing(this);
  }

  /**
   * Load the corresponding texture for this card.
   */
   faceUp() {
     this.setTexture(`${this.suit}_${this.value}`);
   }

  /**
   * Load the card back texture to face card down.
   */
  faceDown() {
    this.setTexture(`back_${this.cardBack}`);
  }

  /**
   * Custom toJSON function.
   *
   * @return {string} - A JSON representation of the card object.
   */
  toJSON() {
    const card = {
      suit: this.suit,
      value: this.value,
      name: this.name
    };

    return card;
  }
}
