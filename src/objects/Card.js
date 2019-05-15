/**
 * @TODO: MAKE MORE ES6-ey
 */
export default class Card extends Phaser.GameObjects.Sprite {

  let _value = number;
  let _name = string;
  let _suit = string;

  constructor(scene: Phaser.Scene, x: number, y: number, key: string, value: number, name: string, suit: string) {
    super(scene, x, y, key, 0);

    this.value = value;
    this.name = name;
    this.suit = suit;
    this.anchor.setTo(0);
    this.faceCardDown();
    game.add.existing(this);
  }

  /**
   * Load the card back texture to face card down.
   */
  public faceCardDown(): void {
    this.loadTexture("back_red");
  }

  /**
   * Load the corresponding texture for this card.
   */
  public faceCardUp(): void {
    this.loadTexture(`${this.suit}_${this.name}`);
  }
}
