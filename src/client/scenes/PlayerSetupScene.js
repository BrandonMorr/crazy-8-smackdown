import Phaser from 'phaser';
import Preload from '../utilities/Preload.js';

/**
 * @class - Player setup scene where the player draws their avatar.
 */
export default class PlayerSetupScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'PlayerSetupScene',
    });
  }

  /**
   * Basically need to load any assets here.
   *
   * @see Preload.js for preload functions.
   */
  preload() {
    Preload.loadBrush(this);
  }

  create(data) {
    this.socket = data.socket;
    this.camera = this.cameras.main;

    this.textureMap = [];

    this.selectedColorOption = '0x000000';

    this.addTitleText();
    this.addPaintCanvas();
    this.addPaintOptions();
    this.addPlayButton();
    this.addClearButton();
  }

  update() { }

  /**
   * Creates a canvas for players to create their avatar and adds it to the
   * scene.
   */
  addPaintCanvas() {
    // Create a background for the render texture.
    let borderOffset = 10;
    let background = this.add.graphics();
    background.fillStyle(0xe0e0e0, 1.0);
    background.fillRoundedRect(this.camera.centerX - 200 - borderOffset, 100 - borderOffset, 400 + (borderOffset * 2), 400 + (borderOffset * 2), 8);

    // Using a render texture, create the canvas for players to draw on.
    this.renderTexture = this.add.renderTexture(this.camera.centerX - 200, 100, 400, 400);
    this.renderTexture.setInteractive();

    // The brush stroke.
    this.brush = this.textures.getFrame('brush');

    // Add a pointer down event which draws a circle where the cursor is.
    this.renderTexture.on('pointerdown', (pointer) => {
      // Coordinates are relative to the render texture's size, so we have
      // to account for this in our x/y positions.
      let xPos = pointer.x - (this.camera.centerX - 200) - 16;
      let yPos = pointer.y - 100 - 16;

      this.renderTexture.draw(this.brush, xPos, yPos, 1, this.selectedColorOption);

      // Store the stroke in the texture map.
      this.textureMap.push({
        x: xPos,
        y: yPos,
        color: this.selectedColorOption
      });
    });

    // Add a pointer move event which draws a circle where the pointer moves to
    // and draws dots for the interpolated values.
    this.renderTexture.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        let dots = pointer.getInterpolatedPosition(15);

        for (let dot of dots) {
          // Coordinates are relative to the render texture's size, so we have
          // to account for this in our x/y positions.
          let xPos = dot.x - (this.camera.centerX - 200) - 16;
          let yPos = dot.y - 100 - 16;

          this.renderTexture.draw(this.brush, xPos, yPos, 1, this.selectedColorOption);

          // Store the stroke in the texture map.
          this.textureMap.push({
            x: xPos,
            y: yPos,
            color: this.selectedColorOption
          });
        }
      }
    });
  }

  /**
   * Add the brush color options to the screen.
   *
   * TODO: add size options.
   */
  addPaintOptions() {
    const colors = [ '0x000000', '0x6356c7', '0x87E0FF', '0x7FFFD4','0xFFB0B0', '0xFFAB76', '0xFCF3B0', '0xFFFFFF' ];
    const colorHexs = [ '#000000', '#6356c7', '#87E0FF', '#7FFFD4','#FFB0B0', '#FFAB76', '#FCF3B0', '#FFFFFF' ];
    let offset= 0;

    for (let i = 0; i <= colors.length - 1; i++) {
      // CSS style string.
      let styleString = `background-color: ${colorHexs[i]}; border-color: ${colorHexs[i]};`;
      let colorButton = this.add.dom(this.camera.centerX + 300, 125 + offset, 'button', styleString);
      colorButton.setClassName('color-button');
      colorButton.addListener('click');

      // Change the color of the brush when clicked.
      colorButton.on('click', () => {
        this.selectedColorOption = colors[i];
      });

      offset += 50;
    }
  }

  /**
   * Add title text to the scene.
   */
  addTitleText() {
    let titleText = this.add.dom(this.camera.centerX, 60, 'div', 'font-size: 28px', 'DRAW YOUR AVATAR');
    titleText.setClassName('title');
  }

  /**
   * Add a play button to the scene.
   */
  addPlayButton() {
    let playButton = this.add.dom(this.camera.centerX, 550, 'button', 'font-size: 16px;', 'SAVE & PLAY');
    playButton.setClassName('game-button');
    playButton.addListener('click');

    playButton.on('click', () => {
      this.renderTexture.saveTexture('avatar');
      this.scene.start('GameScene', {
        socket: this.socket,
        textureMap: this.textureMap
      });
    });
  }

  /**
   * Add a clear button to the scene which jsut resets the MFing scene.
   */
  addClearButton() {
    let clearButton = this.add.dom(this.camera.centerX + 300, 550, 'button', 'font-size: 16px;', 'CLEAR');
    clearButton.setClassName('game-button');
    clearButton.addListener('click');

    clearButton.on('click', () => {
      this.scene.restart();
    });
  }
}
