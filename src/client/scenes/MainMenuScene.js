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
  }

  preload() {

  }

  create() {
    // Currently does jack shit...
    // FontLoader.loadWebFontOpenSans();

    this.addTitleText();
    // this.addRoomCodeInput();
    this.addNameInput();
    this.addCreateGameButton();
    this.addJoinGameButton();

    // Should probably move this into a SocketIO class eventually.
    const socket = SocketIO();

    socket.on('connect', () => {

      this.addConnectionStatus();
    });
  }

  update() {

  }

  /**
   * Add title text to the scene.
   */
  addTitleText() {
    let titleText = this.add.text(400, 100, 'CRAZY 8 SMACKDOWN', { fontFamily: 'Helvetica, "sans-serif"', fontSize: '28px', fontStyle: 'bold', color: '0x000000' });
    titleText.setOrigin(0.5);
  }

  /**
   * Add connection status text to the scene.
   */
  addConnectionStatus() {
    let titleText = this.add.text(700, 550, 'Connected', { fontSize: '18px', fontStyle: 'bold', color: '#7FFFD4' });
    titleText.setOrigin(0.5);
  }

  /**
   * Add a room code input and label.
   */
  addRoomCodeInput() {
    let roomCodeLabel = this.add.text(225, 55, 'ROOM CODE', { fontSize: '18px', color: '0x000000' });
    roomCodeLabel.setOrigin(0.5);

    roomCodeInput = this.add.dom(400, 50, 'input');
    roomCodeInput.setClassName('room-code-input');
    roomCodeInput.setInteractive();
  }

  /**
   * Add a game token input and label.
   */
  addNameInput() {
    let nameLabel = this.add.text(225, 105, 'NAME', { fontSize: '18px', color: '0x000000' });
    nameLabel.setOrigin(0.5);

    nameInput = this.add.dom(400, 100, 'input');
    nameInput.setClassName('name-input');
    nameInput.setInteractive();
  }

  /**
   * Add a start game button that starts the game scene (GameScene.js).
   */
  addCreateGameButton() {
    let createGameButton = this.add.text(300, 400, 'CREATE GAME', { fontSize: '20px', color: '0x000000' });
    createGameButton.setOrigin(0.5);
    createGameButton.setInteractive();

    createGameButton.on('pointerdown', () => {
      // Generate a random byte token.
      // TODO: Should honestly be done on the server-side...
      Crypto.randomBytes(2, (err, buf) => {
        console.log(`Random game token generated: ${buf.toString('hex')}`);
        // Will need to create a game session from here, using the generated
        // buffer as the token to access this new Socket Room.
      });
    });

    createGameButton.on('pointerover', () => {
      createGameButton.setTintFill('0x6356c7');

    });

    createGameButton.on('pointerout', () => {
      createGameButton.clearTint();
    });
  }

  /**
   * Add a player setup button that starts the player setup scene
   * (PlayerSetupScene.js).
   */
  addJoinGameButton() {
    let joinButton = this.add.text(500, 400, 'JOIN', { fontSize: '20px', color: '0x000000' });
    joinButton.setOrigin(0.5);
    joinButton.setInteractive();

    joinButton.on('pointerdown', () => {
      this.scene.start('PlayerSetupScene');
    });

    joinButton.on('pointerover', () => {
      joinButton.setTintFill(0x87E0FF);
    });

    joinButton.on('pointerout', () => {
      joinButton.clearTint();
    });
  }
}
