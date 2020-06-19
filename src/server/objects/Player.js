/**
 * @class - Player class to manage player data.
 */
export default class Player {

  constructor(id, name, roomCode, textureMap) {
    this.id = id;
    this.name = name;
    this.roomCode = roomCode;
    this.textureMap = textureMap;

    this.hand = [];
    this.countdown = 8;
    this.ready = false;
  }

  /**
   * Remove a card from the player's hand, place it in play pile.
   *
   * @param {Card} card - The card to be removed.
   * @param {Deck} deck - The deck which contains the play pile to add to.
   */
  removeCardFromHand(card, deck) {
    const cardToRemoveIndex = this.hand.findIndex((cardObj) => cardObj.name === card.name);
    const cardToRemove = this.hand.splice(cardToRemoveIndex, 1);

    // Add the card to the play pile.
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
   * Return if the player's hand is empty.
   *
   * @return {boolean} - Whether the hand is empty or not.
   */
  checkHandEmpty() {
    return this.hand.length === 0;
  }

  /**
   * Return the last card in the players hand.
   *
   * @return {Card} - The last card in the players hand.
   */
  getLastCardInHand() {
    return this.hand[this.hand.length - 1];
  }
}
