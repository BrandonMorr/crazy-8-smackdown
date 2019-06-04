import Card from "./card";
import Phaser from "phaser";

export default class Deck extends Phaser.GameObjects.Group {

  constructor(scene) {
    super(scene);

    // Generate draw deck and play pile.
    this.deck = this.generateDeck(scene);
    this.pile = [];

    // Add cards to group object.
    for (let card of this.deck) {
      this.add(card);
    }
  }

  /**
   * Generate and return a draw Deck.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   *
   * @return {Card[]} The array containing cards which make up the deck.
   *
   */
  generateDeck(scene) {
    const values = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "k", "q"];
    const suits = ["hearts", "diamonds", "spades", "clubs"];

    let deck = [];

    for (let i = 0; i < suits.length; i++) {
      for (let ii = 0; ii < values.length; ii++) {
        deck.push(new Card(scene, (200 + i), (20 + i), suits[i], values[ii], `${values[ii]} of ${suits[i]}`, "blue"));
      }
    }

    return this.shuffleDeck(deck);
  }

  /**
   * Return the card on the top of the deck.
   *
   * @return {Card} The last card in deck of cards.
   */
  topCard() {
      return this.deck[this.deck.length - 1];
  }

  /**
   * Add array of card(s) to the deck.
   *
   * @param {Card[]} cards - The array of cards to add to the deck.
   */
  addCardsToDeck(cards) {
    this.deck = (this.deck, cards);
  }

  /**
   * Shuffle the damned deck.
   *
   * @param {Card[]} deck - The deck of cards to shuffle.
   *
   * @return {Card[]} The deck of newly, randomly shuffled cards.
   */
  shuffleDeck(deck) {
    return Phaser.Utils.Array.Shuffle(deck);
  }

  /**
   * Used for debugging.
   */
  logDeck() {
    console.log("Deck contents:");
    console.log(this.deck);
  }
}
