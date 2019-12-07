import Phaser from 'phaser';
import Crypto from 'crypto';
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
      color: '000000'
    };
  }

  preload() {

  }

  create() {
    // Currently does jack shit...
    // FontLoader.loadWebFontOpenSans();

    this.addTitleText();
    this.addRoomCodeInput();
    this.addNameInput();
    this.addCreateGameButton();
    this.addPlayButton();

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
   * Add a room code input and label to the scene.
   */
  addRoomCodeInput() {
    let roomCodeLabel = this.add.text(300, 200, 'ROOM CODE', this.labelTextStyle);
    roomCodeLabel.setOrigin(0.5);

    let roomCodeInput = this.add.dom(400, 240, 'input');
    roomCodeInput.setClassName('room-code-input');
    roomCodeInput.setInteractive();
  }

  /**
   * Add a player name input and label to the scene.
   */
  addNameInput() {
    let nameLabel = this.add.text(270, 280, 'NAME', this.labelTextStyle);
    nameLabel.setOrigin(0.5);

    let nameInput = this.add.dom(400, 320, 'input');
    nameInput.setClassName('name-input');
    nameInput.setInteractive();
  }

  /**
   * Add a create game button that creates a game session/token (GameScene).
   */
  addCreateGameButton() {
    let createGameButton = this.add.text(320, 380, 'CREATE GAME', this.labelTextStyle);
    createGameButton.setOrigin(0.5);
    createGameButton.setInteractive();

    createGameButton.on('pointerdown', () => {
      // Generate a random byte token.
      // TODO: Should honestly be done on the server-side...
      Crypto.randomBytes(2, (err, buf) => {
        let roomCode = buf.toString('hex').toUpperCase();
        // Will need to create a game session from here, using the generated
        // buffer as the token to access this new Socket Room.
         let roomCodeInput = dom.querySelector('.room-code-input')
         roomCodeInput.value = roomCode;
      });
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
  addPlayButton() {
    let playButton = this.add.text(520, 380, 'PLAY', this.labelTextStyle);
    playButton.setOrigin(0.5);
    playButton.setInteractive();

    playButton.on('pointerdown', () => {
      let nameInputText = document.querySelector('.name-input');

      if (nameInputText.value !== '') {
        // Tell the server we're creating a new game room.
        this.socket.emit('createRoom', roomCode);
        // Start the player setup scene.
        this.scene.start('PlayerSetupScene');
      }
      else {
        // Err: name must not be empty...
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
