import Phaser from 'phaser';

/**
 * @class - Player class to manage player's hand and countdown score.
 */
export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, name, color) {
    super(scene, x, y);

    this.name = name;
    this.color = color;
    this.countdown = 8;
    this.hand = [];

    this.nameText = scene.add.text(x, y + 50, name);
    this.nameText.setOrigin(0.5);

    this.setTexture(`player_${this.color}`);
  }

  /**
   * Remove a card from the player's hand, place it in play pile.
   *
   * @param {Card} cards - The card to be removed.
   * @param {Deck} deck - The deck which contains the play pile to add to.
   *
   * @return {Card} - The last card added to playPile.
   */
  removeCardFromHand(card, deck) {
    let cardToRemove = this.hand.splice(this.hand.indexOf(card), 1);
    deck.playPile.unshift(cardToRemove[0]);
    console.log(`[${this.name}] ${cardToRemove[0].name} was played!`);

    return deck.getLastPlayCard();
  }

  /**
   * Remove multiple cards from the player's hand, place it in play pile.
   *
   * @param {Card[]} cards - The cards to be removed.
   * @param {Deck} deck - The deck which contains the play pile to add to.
   *
   * @return {Card} - The last card added to playPile.
   */
  removeCardsFromHand(cards, deck) {
    for (let card of cards) {
      let cardToRemove = this.hand.splice(this.hand.indexOf(card), 1);
      deck.playPile.unshift(cardToRemove[0]);

      console.log(`[${this.name}] ${cardToRemove[0].name} was played!`);
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
}
