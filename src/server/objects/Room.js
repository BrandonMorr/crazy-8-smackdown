/**
 * @class - Room class to manage players/score.
 */
export default class Room {

  constructor(roomCode) {
    this.roomCode = roomCode;

    this.gameOver = false;
    this.gameStarted = false;

    this.playerOrder = [];
    this.playerTurn = 0;
  }
}
