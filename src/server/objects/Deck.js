import Card from './Card';

/**
 * @class - Deck class to manage the deck of cards.
 */
export default class Deck {

  constructor() {
    // This is where cards will be drawn from.
    this.drawPile = [];
    // This is where cards will played into.
    this.playPile = [];
    // Generate the deck, baby.
    this.generateDeck();
  }

  /**
   * Generate and randomly shuffle draw Deck.
   */
  generateDeck() {
    const values = [ 'a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k' ];
    const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];

    let deck = [];

    for (let i = 0; i < suits.length; i++) {
      for (let ii = 0; ii < values.length; ii++) {
        deck.push(new Card(suits[i], values[ii], `${values[ii]} of ${suits[i]}`));
      }
    }

    this.drawPile = this.shuffle(deck);
  }

  /**
   * Return the next card of the draw pile (index 0 is considered the top).
   *
   * @return {Card} The last card in deck of cards.
   */
  getNextDrawCard() {
      return this.drawPile[0];
  }

  /**
   * Return the top card of the play pile (index 0 is considered the top).
   *
   * @return {Card} The last card in deck of cards.
   */
  getLastPlayCard() {
      return this.playPile[0];
  }

  /**
   * Add a card to the draw pile.
   *
   * @param {Card} card - The card to add to the play pile.
   */
  addCardToDrawPile(card) {
    this.drawPile.unshift(card);
  }

  /**
   * Add a card to the play pile.
   *
   * @param {Card} card - The card to add to the play pile.
   */
  addCardToPlayPile(card) {
    this.playPile.unshift(card);
  }

  /**
   * Shuffle the play pile, pass that back to the draw pile and clear playPile.
   */
  shuffleDeck() {
    // Keep the last played card.
    let card = this.playPile.shift();
    // Shuffle the play pile and move it back into the draw pile.
    this.drawPile = this.shuffle(this.playPile);
    // Reset the play pile.
    this.playPile = [ card ];
  }

  /**
   * Randomly shuffle an array of cards using Fisher Yates implementation.
   *
   * @return {Card[]} The randomly shuffled cards.
   */
  shuffle(cards) {
    for (var i = cards.length - 1; i > 0; i--) {
      var randomIndex = Math.floor(Math.random() * (i + 1));
      var itemAtIndex = cards[randomIndex];

      cards[randomIndex] = cards[i];
      cards[i] = itemAtIndex;
    }

    return cards;
  }
}
