/**
 * @class - Room class to manage players/score.
 */
export default class Room {

  constructor(roomCode) {
    this.roomCode = roomCode;

    this.gameOver = false;
    this.gameStarted = false;
    this.reverseDirection = false;

    this.playerOrder = [];
    this.playerTurn = 0;
  }

  /**
   * Get the next player in the order of play.
   *
   * @return - The next player in the order of play.
   */
  getNextPlayer() {
    // Grab the size of the player order array so we can target the player last
    // in order.
    let playerLastOrder = this.playerOrder.length - 1;

    if (this.reverseDirection) {
      // If the player first in order has played, reset back to last player.
      // Otherwise move to next player in order.
      this.playerTurn === 0 ? this.playerTurn = playerLastOrder : this.playerTurn--;
    }
    else {
      // If the player last in order has played, reset back to first player.
      // Otherwise move to next player in order.
      this.playerTurn === playerLastOrder ? this.playerTurn = 0 : this.playerTurn++;
    }

    return this.playerOrder[this.playerTurn];
  }

  /**
   * Remove a player from the player order array.
   *
   * @param {string} id - socket id of the player to remove from the game.
   */
  removePlayerByID(id) {
    this.playerOrder = this.playerOrder.filter(player => player.id !== id);
  }
}
