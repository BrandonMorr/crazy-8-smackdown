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
   * Add a card to the draw pile.
   *
   * @param {Card} card - The card to add to the play pile.
   */
  addCardToDrawPile(card) {
    // Add card to playpile.
    this.drawPile.unshift(card);
  }

  /**
   * Add a card to the play pile.
   *
   * @param {Card} card - The card to add to the play pile.
   */
  addCardToPlayPile(card) {
    // Set depth to 0 so the new card is displayed on top
    for (let pileCard of this.playPile) {
      pileCard.setDepth(0);
    }

    card.setDepth(1);

    // Add card to playpile.
    this.playPile.unshift(card);
  }

  /**
   * Shuffle the play pile, pass that back to the draw pile and clear playPile.
   */
  shuffleDeck() {
    this.drawPile = Phaser.Utils.Array.Shuffle(this.playPile);

    for (let card of this.drawPile) {
      card.setFaceDown();
    }

    this.playPile = [];
  }
}
