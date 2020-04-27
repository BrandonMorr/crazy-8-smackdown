import Phaser from 'phaser';
import Card from './Card';

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
    // Generate the deck, baby.
    this.generateDeck(scene);

    for (let card of this.drawPile) {
      // Add card to group object.
      this.add(card, true);
      // Set the overall scale of the card to be 25% smaller.
      card.scale = 0.75;
    }
  }

  /**
   * Generate and randomly shuffle draw Deck.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   *
   */
  generateDeck(scene) {
    const values = [ 'a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k' ];
    const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];
    const backColors = [ 'blue', 'green', 'red' ];

    let deck = [];
    let backColor = Phaser.Math.RND.pick(backColors);

    let middleY = scene.cameras.main.height / 2;

    for (let i = 0; i < suits.length; i++) {
      for (let ii = 0; ii < values.length; ii++) {
        deck.push(new Card(scene, (125 + i), (middleY + i), suits[i], values[ii], `${values[ii]} of ${suits[i]}`, backColor));
      }
    }

    this.drawPile = Phaser.Utils.Array.Shuffle(deck);
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
    console.log('*** Shuffling the deck ***');
    this.drawPile = Phaser.Utils.Array.Shuffle(this.playPile);
    this.drawPile.forEach((card) => {
      card.faceCardDown();
    });
    this.playPile = [];
  }
}
