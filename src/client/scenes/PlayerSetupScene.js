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
    Preload.loadOther(this);
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
    const borderOffset = 10;
    const background = this.add.graphics();
    background.fillStyle(0xe0e0e0, 1.0);
    background.fillRoundedRect(this.camera.centerX - 200 - borderOffset, this.camera.centerY - 200 - borderOffset, 400 + (borderOffset * 2), 400 + (borderOffset * 2), 8);

    // Using a render texture, create the canvas for players to draw on.
    this.renderTexture = this.add.renderTexture(this.camera.centerX - 200, this.camera.centerY - 200, 400, 400);
    this.renderTexture.setInteractive();

    // The brush stroke.
    this.brush = this.textures.getFrame('brush');

    // Add a pointer down event which draws a circle where the cursor is.
    this.renderTexture.on('pointerdown', (pointer) => {
      // Coordinates are relative to the render texture's size, so we have
      // to account for this in our x/y positions.
      const xPos = pointer.x - (this.camera.centerX - 200) - 16;
      const yPos = pointer.y - (this.camera.centerY - 200) - 16;

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
        const dots = pointer.getInterpolatedPosition(30);

        for (let dot of dots) {
          // Coordinates are relative to the render texture's size, so we have
          // to account for this in our x/y positions.
          const xPos = dot.x - (this.camera.centerX - 200) - 16;
          const yPos = dot.y - (this.camera.centerY - 200) - 16;

          this.renderTexture.draw(this.brush, xPos, yPos, 1, this.selectedColorOption);
        }

        // Lower interpolated values to be stored in player's texture map.
        // NOTE: did this to reduce the load time to recreate player avatars
        // when a player connects.
        const mapDots = pointer.getInterpolatedPosition(10);

        for (let dot of mapDots) {
          // Coordinates are relative to the render texture's size, so we have
          // to account for this in our x/y positions.
          const xPos = dot.x - (this.camera.centerX - 200) - 16;
          const yPos = dot.y - (this.camera.centerY - 200) - 16;

          // Store the stroke in the texture map (representation of the player
          // drawn avatar).
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

    let offset = 0;

    for (let i = 0; i <= colors.length - 1; i++) {
      // CSS style string.
      const styleString = `background-color: ${colorHexs[i]}; border-color: ${colorHexs[i]};`;
      const colorButton = this.add.dom(this.camera.centerX + 300, this.camera.centerY - 180 + offset, 'button', styleString);
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
    const titleText = this.add.dom(this.camera.centerX, this.camera.centerY - 250, 'div', 'font-size: 28px', 'DRAW YOUR AVATAR');
    titleText.setClassName('title-setup');
  }

  /**
   * Add a play button to the scene.
   */
  addPlayButton() {
    const playButton = this.add.dom(this.camera.centerX, this.camera.centerY + 250, 'button', 'font-size: 16px;', 'SAVE & PLAY');
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
   * Add a clear button to the scene which just resets the MFing scene.
   */
  addClearButton() {
    const clearButton = this.add.dom(this.camera.centerX + 300, this.camera.centerY + 250, 'button', 'font-size: 16px; width: 82px', 'CLEAR');
    clearButton.setClassName('game-button');
    clearButton.addListener('click');

    clearButton.on('click', () => {
      this.scene.restart();
    });
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
