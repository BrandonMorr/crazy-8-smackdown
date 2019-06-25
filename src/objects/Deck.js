import Phaser from "phaser";
import Card from "./Card";

/**
 * @class - Deck class to manage the deck of cards.
 */

export default class Deck extends Phaser.GameObjects.Group {

  constructor(scene) {
    super(scene);

    // This is where cards will be drawn from.
    this.drawPile = [];
    // This is where cards will played into.
    this.playPile = [];
    // Generate the deck baby.
    this.generateDeck(scene);

    // Add cards to group object.
    for (let card of this.drawPile) {
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

    this.drawPile = Phaser.Utils.Array.Shuffle(deck);
  }

  /**
   * Return the next card of the draw pile.
   *
   * @return {Card} The last card in deck of cards.
   */
  getNextDrawCard() {
      return this.drawPile[0];
  }

  /**
   * Return the top card of the play pile.
   *
   * @return {Card} The last card in deck of cards.
   */
  getLastPlayCard() {
      return this.playPile[0];
  }

  /**
   * Add array of card(s) to the deck.
   *
   * @param {Card[]} cards - The array of cards to add to the deck.
   */
  addCardsToDeck(cards) {
    this.drawPile = (this.drawPile, cards);
  }

  /**
   * Shuffle the play pile, pass that back to the draw pile and clear playPile.
   */
  shuffleDeck() {
    console.log("*** Shuffling the deck ***");
    this.drawPile = Phaser.Utils.Array.Shuffle(this.playPile);
    this.playPile = [];
  }

  /**
   * Debug utils :-)
   */
  logDrawPile() {
    console.log("*** Draw pile contents ***");
    console.log(this.drawPile);
  }

  logPlayPile() {
    console.log("*** Play pile contents ***");
    console.log(this.playPile);
  }
}
