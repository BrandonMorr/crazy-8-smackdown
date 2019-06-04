/**
 * @class - Player class to manage player's hand and countdown score.
 */
export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, id, color) {
    super(scene, 100, 100);

    this.id = id;
    this.color = color;
    this.coundown = 8;
    this.hand = [];

    this.setTexture(`player_${this.color}`);
  }

  /**
   * Remove card from the player's hand and return it.
   *
   * @param {Card} card - The card to be removed and played.
   */
  playCard(card) {
    const cardToPlay = this.hand.splice(this.hand.indexOf(card), 1);

    return cardToPlay[0];
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
   * Used for debugging.
   */
  logHand() {
    console.log("Player " + this.id + "'s hand: \n" + this.hand);
  }
}
