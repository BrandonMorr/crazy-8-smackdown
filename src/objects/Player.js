/**
 * @TODO: MAKE MORE ES6-ey
 */
export class Player {

  private id: number;
  private name: string;
  private coundown: number;
  private hand: Card[];

  /**
   * @param id - Player ID... not sure if I'll end up using this when
   * multiplay comes in the future.
   */
  constructor(id: number) {
    this.id = id;
    this.coundown = 8;
  }

  /**
   * Remove card from the player's hand and return it.
   *
   * @param card - card to be removed and played.
   */
  public playCard(card: Card): Card {
    const cardToPlay = this.hand.splice(this.hand.indexOf(card), 1);

    return cardToPlay[0];
  }

  /**
   * Add a card to player's hand.
   *
   * @param card - card to be added to hand.
   */
  public addCard(card: Card): void {
    this.hand.push(card);
  }

  /**
   * Used for debugging.
   */
  public logHand(): void {
    console.log("Player " + this.id + "'s hand: \n" + this.hand);
  }
}
