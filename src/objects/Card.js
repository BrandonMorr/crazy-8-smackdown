/**
 * @class - Card class to store suit/value information.
 */
export default class Card extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, suit, value, name, cardBack) {
    super(scene, x, y);

    this.suit = suit;
    this.value = value;
    this.name = name;
    this.cardBack = cardBack;

    this.setOrigin(0.5);
    this.faceCardDown();
  }

  /**
   * Load the card back texture to face card down.
   */
  faceCardDown() {
    this.setTexture(`back_${this.cardBack}`);
  }

  /**
   * Load the corresponding texture for this card.
   */
   faceCardUp() {
     this.setTexture(`${this.suit}_${this.value}`);
   }
}
