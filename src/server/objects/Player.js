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

    console.log(`[${this.name}] ${card.name} was added to hand!`);
  }
}
