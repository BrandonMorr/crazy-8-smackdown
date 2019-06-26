/**
 * @class - Player class to manage player's hand and countdown score.
 */

export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, id, name, color) {
    super(scene, x, y);

    this.id = id;
    this.name = name;
    this.color = color;
    this.coundown = 8;
    this.hand = [];

    this.nameText = scene.add.text(x, y + 50, name);
    this.nameText.setOrigin(0.5);

    this.setTexture(`player_${this.color}`);
  }

  /**
   * Remove card from the player's hand and return it.
   *
   * @param {Card} cards - The card(s) to be removed.
   *
   * @return {Card} - The last card added to playPile.
   */
  removeCardFromHand(cards, deck) {
    for (let card of cards) {
      let cardToRemove = this.hand.splice(this.hand.indexOf(card), 1);
      console.log(`[${this.name}] ${cardToRemove[0].name} was played!`);
      deck.playPile.push(cardToRemove[0]);
    }

    return deck.getLastPlayCard();
  }

  /**
   * Remove card from the player's hand and return it.
   *
   * @param {Card} cards - The card(s) to be removed.
   *
   * @return {Card} - The last card added to playPile.
   */
  removeCardFromHandWithId(ids, deck) {
    for (let id of ids) {
      let cardToRemove = this.hand.splice(this.hand[id], 1);
      console.log(`[${this.name}] ${cardToRemove[0].name} was played!`);
      deck.playPile.push(cardToRemove[0]);
    }

    return deck.getLastPlayCard();
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
    console.log("*** Player " + this.id + "'s hand ***");
    console.log(this.hand);
  }
}
