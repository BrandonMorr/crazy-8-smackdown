/**
 * @TODO: MAKE MORE ES6-ey
 */
import { Card } from "./card";

export class Deck {

  public deck: Card[];

  /**
   * Generate a draw Deck.
   *
   * TODO: At some point... should use inheritence to break the draw Deck and play Deck into subclasses.
   *
   * @param game - Phaser Game object.
   */
  public generateDrawDeck(game: Phaser.Game) {
    const names = ["a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "k", "q"];
    const suits = ["hearts", "diamonds", "spades", "clubs"];

    for (let i = 0; i < suits.length; i++) {
      for (let ii = 0; ii < names.length; ii++) {
        this.deck.push(new Card(game, (200 + i), (20 + i), `${suits[i]}_${names[ii]}`, ii + 1, names[ii], suits[i]));
      }
    }

    this.shuffleDeck();
  }

  /**
   * Generate a play Deck.
   *
   * Take the top card of the draw deck and use it as initial card to start gameplay.
   *
   * @param game - Phaser Game object
   * @param drawDeck - The drawDeck collection of cards to take the card from
   */
  public generatePlayDeck(game: Phaser.Game, drawDeck: Card[]): void {
    const cardToAdd = drawDeck.pop();

    if (cardToAdd) {
      this.deck.push(cardToAdd);

      const tween = game.add.tween(cardToAdd).to({ x: 450, y: 20 }, 400, Phaser.Easing.Cubic.In);
      tween.onComplete.add(function() { cardToAdd.faceCardUp(); }, this);
      tween.start();
    } else {
      console.log("This shouldn't happen...");
    }
}

  /**
   * Return the Card on the top of the deck.
   */
  public topCard(): Card {

      return this.deck[this.deck.length - 1];

  }

  /**
   * Deal a card to the Player, Tween the card to the player's hand.
   *
   * @param game - Phaser Game object.
   * @param player - Player we are dealing to.
   */
  public dealToPlayer(game: Phaser.Game, player: Player): void {
    const cardToAdd = this.deck.pop();
    // XXX: this will be gross, but will work for now.
    const xPos = (player.id * 500) + (player.hand.length * 100);

    if (cardToAdd) {
      player.addCard(cardToAdd);

      const tween = game.add.tween(cardToAdd).to({ x: xPos, y: 400 }, 400, Phaser.Easing.Cubic.In);
      tween.onComplete.add(function() { cardToAdd.faceCardUp(); }, this);
      tween.start();
    } else {
      console.log("Ran out of cards to deal!");
    }
  }

  /**
   * Add array of card(s) to the deck.
   *
   * @param cards - array of card(s) to add to the deck.
   */
  public addCards(cards: Card[]): void {
    this.deck = (this.deck, cards);
  }

  /**
   * Shuffle the deck. Somehow this works?
   */
  public shuffleDeck(): void {
    Phaser.ArrayUtils.shuffle(this.deck);
  }

  /**
   * Used for debugging.
   */
  public logDeck(): void {
    console.log("Deck contents:");
    console.log(this.deck);
  }
}
