import Phaser from 'phaser';
import SocketIO from 'socket.io-client';
import FontLoader from '../utilities/FontLoader';

/**
 * @class - It's da main menu scene!
 */
export default class MainMenuScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'MainMenuScene',
    });

    this.titleTextStyle = {
      fontFamily: 'Helvetica, "sans-serif"',
      fontSize: '28px',
      fontStyle: 'bold',
      color: '#000000'
    };

    this.statusTextStyle = {
      fontFamily: 'Helvetica, "sans-serif"',
      fontSize: '14px',
      color: '#99ff99'
    };

    this.labelTextStyle = {
      fontFamily: 'Helvetica, "sans-serif"',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '#000000'
    };
  }

  preload() {
    // Currently does jack shit...
    FontLoader.loadWebFontOpenSans();
  }

  create() {
    this.addTitleText();
    this.addRoomCodeInput();
    this.addNameInput();
    this.addCreateGameButton();
    this.addJoinButton();

    // Should probably move this into a SocketIO class eventually.
    this.socket = SocketIO();
    this.socket.on('connect', () => {
      this.addConnectionStatus();
    });
  }

  update() {

  }

  /**
   * Add title text to the scene.
   */
  addTitleText() {
    let titleText = this.add.text(400, 100, 'CRAZY 8 SMACKDOWN', this.titleTextStyle);
    titleText.setOrigin(0.5);
  }

  /**
   * Add connection status text to the scene.
   */
  addConnectionStatus() {
    let statusText = this.add.text(750, 580, 'ONLINE', this.statusTextStyle);
    statusText.setOrigin(0.5);
  }

  /**
   * Add a player name input and label to the scene.
   */
  addNameInput() {
    let nameLabel = this.add.text(270, 200, 'NAME', this.labelTextStyle);
    nameLabel.setOrigin(0.5);

    let nameInput = this.add.dom(400, 240, 'input');
    nameInput.setClassName('name-input');
    nameInput.node.maxLength = 12;
    nameInput.node.placeholder = 'ENTER YOUR NAME';
    nameInput.setInteractive();
  }

  /**
   * Add a room code input and label to the scene.
   */
  addRoomCodeInput() {
    let roomCodeLabel = this.add.text(300, 280, 'ROOM CODE', this.labelTextStyle);
    roomCodeLabel.setOrigin(0.5);

    let roomCodeInput = this.add.dom(400, 320, 'input');
    roomCodeInput.setClassName('room-code-input');
    roomCodeInput.node.maxLength = 4;
    roomCodeInput.node.placeholder = 'ENTER 4 CHARACTER CODE';
    roomCodeInput.setInteractive();
  }

  /**
   * Add a create game button that creates a game session/token (GameScene).
   */
  addCreateGameButton() {
    let createGameButton = this.add.text(310, 380, 'CREATE GAME', this.labelTextStyle);
    createGameButton.setOrigin(0.5);
    createGameButton.setInteractive();

    createGameButton.on('pointerdown', () => {
      let playerName = document.querySelector('.name-input').value;

      if (playerName !== '') {
        // Tell the server who we are and that we're creating a new game.
        this.socket.name = playerName.toUpperCase();
        this.socket.emit('new game');
        this.scene.start('GameScene', this.socket);
      }
      else {
        // Err: name must not be empty.
      }
    });

    createGameButton.on('pointerover', () => {
      createGameButton.setTintFill(0x8b8b8b);
    });

    createGameButton.on('pointerout', () => {
      createGameButton.clearTint();
    });
  }

  /**
   * Add a play button that starts the player setup scene (PlayerSetupScene).
   */
  addJoinButton() {
    let playButton = this.add.text(520, 380, 'JOIN', this.labelTextStyle);
    playButton.setOrigin(0.5);
    playButton.setInteractive();

    playButton.on('pointerdown', () => {
      let playerName = document.querySelector('.name-input').value;
      let roomCode = document.querySelector('.room-code-input').value;

      if (playerName !== '' && roomCode !== '') {
        // Tell the server who we are and that we're joining an existing game.
        this.socket.name = playerName.toUpperCase();
        this.socket.emit('join game', roomCode);
        this.scene.start('GameScene', this.socket);
        // XXX: Uncomment this later, going to focus on other things before
        // working on the player setup...
        // Start the player setup scene.
        // this.scene.start('PlayerSetupScene', this.socket);
      }
      else {
        // Err: name & room must not be empty...
      }
    });

    playButton.on('pointerover', () => {
      playButton.setTintFill(0x8b8b8b);
    });

    playButton.on('pointerout', () => {
      playButton.clearTint();
    });
  }
}
