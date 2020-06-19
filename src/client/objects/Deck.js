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
   */
  generateDeck(scene) {
    const values = [ 'a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'q', 'k' ];
    const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];
    const backColors = [ 'blue', 'green', 'red' ];

    const deck = [];
    const backColor = Phaser.Math.RND.pick(backColors);

    const middleY = scene.cameras.main.height / 2;

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

    // Add card to play pile.
    this.playPile.unshift(card);
  }

  /**
   * Show an arbitrary card in the scene that represents the draw pile.
   */
  addDrawPileCard(scene) {
    // Create an arbitrary card.
    this.drawPileCard = new Card(scene, scene.camera.centerX - 150, scene.camera.centerY, 'spades', 'a', 'a of spades');
    this.drawPileCard.faceDown();
   }

  /**
   * Shuffle the play pile, pass that back to the draw pile and empty play pile.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  shuffle(scene) {
    // Get the size of the pile (subract one so the loop understands).
    const pileSize = this.playPile.length - 1;

    // Remove the draw pile card.
    this.drawPileCard.destroy();

    for (let i = 0; i <= pileSize; i++) {
      const card = this.playPile[i];

      // Skip the last card played (first in the play pile array).
      if (i >= 1) {
        scene.tweens.add({
          targets: card,
          x: scene.camera.centerX - 150,
          ease: 'Linear',
          duration: 250,
          onStart: () => {
            card.faceDown();
          },
          onComplete: () => {
            if (i === pileSize) {
              // Move the last card to the draw pile.
              this.addCardToDrawPile(card);
            }
            else {
              // Destroy every other card.
              card.destroy();
            }
          }
        });
      }
    }

    // We only want to hold onto the last card played for the play pile.
    this.playPile = [this.playPile[0]];
  }

  /**
   * Remove the deck of cards from scene.
   */
  remove() {
    for (let card of this.playPile) {
      card.destroy();
    }

    for (let card of this.drawPile) {
      card.destroy();
    }

    this.drawPileCard.destroy();
  }
}
