import Phaser from 'phaser';

/**
 * @class - Player class to manage players.
 */
export default class Player extends Phaser.GameObjects.Sprite {

  constructor(scene, x, y, name) {
    super(scene, x, y);

    this.name = name;
    this.countdown = 8;
    this.hand = [];
    this.ready = false;

    this.nameText = this.scene.add.text(x, y + 60, name, {
      fontFamily: 'Helvetica, "sans-serif"',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#000000'
    });
    this.nameText.setOrigin(0.5);

    this.scene.add.existing(this);
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

  /**
   * Add text to show player is ready smack down.
   */
   playerReady() {
     this.readyText = this.scene.add.text(this.x, this.y + 85, 'READY', {
       fontFamily: 'Helvetica, "sans-serif"',
       fontSize: '14px',
       color: '#99ff99'
     });
     this.readyText.setOrigin(0.5);

     this.ready = true;
   }

   /**
    * Will remove this in the future.
    */
   setPlayerTexture(playerNumber) {
     this.setTexture(`player_${playerNumber}`);
   }

  /**
   * Remove any player-relavant stuff from scene.
   */
  removePlayer() {
    if (this.nameText) {
      this.nameText.destroy();
    }

    if (this.readyText) {
      this.readyText.destroy();
    }

    this.destroy(); // Cya doods!
  }
}
