/**
 * @class - Player class to manage players.
 */
export default class Player {

  constructor(id, name, roomCode) {
    this.id = id;
    this.name = name;
    this.roomCode = roomCode;

    this.hand = [];
    this.countdown = 8;
    this.ready = false;
  }

  /**
   * Remove a card from the player's hand, place it in play pile.
   *
   * @param {Card} cards - The card to be removed.
   * @param {Deck} deck - The deck which contains the play pile to add to.
   */
  removeCardFromHand(card, deck) {
    let cardToRemove = this.hand.splice(this.hand.indexOf(card), 1);
    deck.addCardToPlayPile(cardToRemove[0]);

    console.log(`${card.name} was removed from ${this.name}`);
  }

  /**
   * Add a card to the player's hand.
   *
   * @param {Card} card - The card to be added to the player's hand.
   */
  addCardToHand(card) {
    this.hand.push(card);

    console.log(`${card.name} was added to ${this.name}`);
  }
}
