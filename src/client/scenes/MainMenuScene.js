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
    let titleText = this.add.dom(this.camera.centerX, 125, 'div', 'font-size: 27px', 'CRAZY 8 SMACKDOWN');
    titleText.setClassName('title-menu');
  }

  /**
   * Add connection status text to the scene.
   */
  addConnectionStatus() {
    let statusText = this.add.dom((this.camera.width / 4 * 3), (this.camera.height / 4  * 3), 'div', 'font-size: 14px;', 'CONNECTED');
    statusText.setClassName('status');
  }

  /**
   * Add a player name input and label to the scene.
   */
  addNameInput() {
    let nameLabel = this.add.dom(this.camera.centerX - 130, 205, 'div', 'font-size: 18px;', 'NAME');
    nameLabel.setClassName('label');

    let nameInput = this.add.dom(this.camera.centerX, 240, 'input');
    nameInput.setClassName('name-input');
    nameInput.node.maxLength = 12;
    nameInput.node.placeholder = 'ENTER YOUR NAME';
    nameInput.setInteractive();
  }

  /**
   * Add a room code input and label to the scene.
   */
  addRoomCodeInput() {
    let roomCodeLabel = this.add.dom(this.camera.centerX - 100, 285, 'div', 'font-size: 18px;', 'ROOM CODE');
    roomCodeLabel.setClassName('label');

    let roomCodeInput = this.add.dom(this.camera.centerX, 320, 'input');
    roomCodeInput.setClassName('room-code-input');
    roomCodeInput.node.maxLength = 4;
    roomCodeInput.node.placeholder = 'ENTER 4 CHARACTER CODE';
    roomCodeInput.setInteractive();
  }

  /**
   * Add a create game button that creates a game session/token (GameScene).
   */
  addCreateGameButton() {
    let createGameButton = this.add.dom(this.camera.centerX - 85, 380, 'button', 'font-size: 16px;', 'CREATE GAME');
    createGameButton.setClassName('menu-button');
    createGameButton.addListener('click');

    createGameButton.on('click', () => {
      let playerName = document.querySelector('.name-input').value.toUpperCase();
      let roomCode = document.querySelector('.room-code-input').value.toLowerCase();

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
    let joinButton = this.add.dom(this.camera.centerX + 85, 380, 'button', 'font-size: 16px;', 'JOIN');
    joinButton.setClassName('menu-button');
    joinButton.addListener('click');

    joinButton.on('click', () => {
      let playerName = document.querySelector('.name-input').value.toUpperCase();
      let roomCode = document.querySelector('.room-code-input').value.toLowerCase();

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
      this.errorMessage = this.add.dom(this.camera.centerX, 440, 'div', 'font-size: 16px;', errorMessage);
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
}
