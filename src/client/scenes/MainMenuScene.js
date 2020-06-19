import Phaser from 'phaser';
import SocketIO from 'socket.io-client';

/**
 * @class - It's da main menu scene!
 */
export default class MainMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'MainMenuScene',
    });
  }

  preload() { }

  create() {
    this.socket = new SocketIO();
    this.camera = this.cameras.main;

    // Show that the client has connected to the server.
    this.socket.on('connect', () => {
      this.addConnectionStatus();
      this.socket.off('connect');
    });

    // New game handler.
    this.socket.on('new game', (roomCode) => {
      this.socket.roomCode = roomCode;
      this.scene.start('PlayerSetupScene', { socket: this.socket });
    });

    // Join game handler.
    this.socket.on('join game', () => {
      this.scene.start('PlayerSetupScene', { socket: this.socket });
    });

    // Show any errors when trying to create/join a room.
    this.socket.on('room error', (errorMessage) => {
      this.showErrorMessage(errorMessage);
    });

    this.addTitleText();
    this.addRoomCodeInput();
    this.addNameInput();
    this.addCreateGameButton();
    this.addJoinButton();
  }

  update() { }

  /**
   * Add title text to the scene.
   */
  addTitleText() {
    const titleText = this.add.dom(this.camera.centerX, this.camera.centerY - 200, 'div', 'font-size: 27px', 'CRAZY 8 SMACKDOWN');
    titleText.setClassName('title-menu');
  }

  /**
   * Add connection status text to the scene.
   */
  addConnectionStatus() {
    const statusText = this.add.dom(this.getGridRowPosition(3), this.getGridColumnPosition(4), 'div', 'font-size: 14px;', 'CONNECTED');
    statusText.setClassName('status');
  }

  /**
   * Add a player name input and label to the scene.
   */
  addNameInput() {
    const nameLabel = this.add.dom(this.camera.centerX - 130, this.camera.centerY - 100 - 35, 'div', 'font-size: 18px;', 'NAME');
    nameLabel.setClassName('label');

    const nameInput = this.add.dom(this.camera.centerX, this.camera.centerY - 100, 'input');
    nameInput.setClassName('name-input');
    nameInput.node.maxLength = 12;
    nameInput.node.placeholder = 'ENTER YOUR NAME';
    nameInput.setInteractive();
  }

  /**
   * Add a room code input and label to the scene.
   */
  addRoomCodeInput() {
    const roomCodeLabel = this.add.dom(this.camera.centerX - 100, this.camera.centerY - 20 - 35, 'div', 'font-size: 18px;', 'ROOM CODE');
    roomCodeLabel.setClassName('label');

    const roomCodeInput = this.add.dom(this.camera.centerX, this.camera.centerY - 20, 'input');
    roomCodeInput.setClassName('room-code-input');
    roomCodeInput.node.maxLength = 4;
    roomCodeInput.node.placeholder = 'ENTER 4 CHARACTER CODE';
    roomCodeInput.setInteractive();
  }

  /**
   * Add a create game button that creates a game session/token (GameScene).
   */
  addCreateGameButton() {
    const createGameButton = this.add.dom(this.camera.centerX - 85, this.camera.centerY + 40, 'button', 'font-size: 16px;', 'CREATE GAME');
    createGameButton.setClassName('menu-button');
    createGameButton.addListener('click');

    createGameButton.on('click', () => {
      const playerName = document.querySelector('.name-input').value.toUpperCase();
      const roomCode = document.querySelector('.room-code-input').value.toLowerCase();

      if (playerName !== '') {
        this.socket.name = playerName.toUpperCase();

        // If the user provides a room code, lets just go with that one.
        if (roomCode !== '') {
          // Room codes must be 4 characters long.
          if (roomCode.length === 4) {
            // Room code cannot contain spaces.
            if (!roomCode.includes(' ')) {
              this.socket.emit('new game', roomCode);
            }
            else {
              this.showErrorMessage('ROOM CODE MUST NOT CONTAIN SPACES');
            }
          }
          else {
            this.showErrorMessage('ROOM CODE MUST CONTAIN 4 CHARACTERS');
          }
        }
        else {
          this.socket.emit('new game');
        }
      }
      else {
        this.showErrorMessage('NAME MUST NOT BE EMPTY');
      }
    });
  }

  /**
   * Add a play button that starts the player setup scene (PlayerSetupScene).
   */
  addJoinButton() {
    const joinButton = this.add.dom(this.camera.centerX + 85, this.camera.centerY + 40, 'button', 'font-size: 16px;', 'JOIN');
    joinButton.setClassName('menu-button');
    joinButton.addListener('click');

    joinButton.on('click', () => {
      const playerName = document.querySelector('.name-input').value.toUpperCase();
      const roomCode = document.querySelector('.room-code-input').value.toLowerCase();

      if (playerName !== '' && roomCode !== '') {
        // Tell the server who we are and that we're joining an existing game.
        this.socket.name = playerName;
        this.socket.roomCode = roomCode;

        this.socket.emit('join request', roomCode);
      }
      else {
        this.showErrorMessage('NAME & ROOM CODE MUST NOT BE EMPTY');
      }
    });
  }

  /**
   * Display error message to the user, fade it out after a few seconds.
   */
  showErrorMessage(errorMessage) {
    // Only display one error message at a time.
    if (!this.errorMessage) {
      this.errorMessage = this.add.dom(this.camera.centerX, this.getGridColumnPosition(8, 12), 'div', 'font-size: 16px;', errorMessage);
      this.errorMessage.setClassName('message-error');

      this.tweens.add({
        targets: this.errorMessage,
        delay: 2000,
        alpha: 0,
        ease: 'linear',
        duration: 400,
        onComplete: () => {
          this.errorMessage.destroy();
          this.errorMessage = false;
        }
      });
    }
  }

  /**
   * Return the x position of a line for given row.
   */
  getGridRowPosition(row, numberOfRows = 4) {
    return (this.camera.width / numberOfRows) * row;
  }

  /**
   * Return the y position of a line for given column.
   */
  getGridColumnPosition(column, numberOfColumns = 5) {
    return (this.camera.height / numberOfColumns) * column;
  }
}
