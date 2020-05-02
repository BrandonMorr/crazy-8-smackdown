import Phaser from 'phaser';

/**
 * @class - Player setup scene where the player draws their avatar.
 */
export default class PlayerSetupScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'PlayerSetupScene',
    });
  }

  preload() {

  }

  create(socket) {
    this.socket = socket;

    this.lastDot = false;
    this.selectedSizeOption = 6;
    this.selectedColorOption = '0x000000';

    this.strokeMap = [];

    this.addTitleText();
    this.addPaintCanvas();
    this.addPaintOptions();
    this.addPlayButton();
    this.addClearButton();
  }

  update() {

  }

  /**
   * Creates a canvas for players to create their avatar and adds it to the
   * scene.
   *
   * @TODO: This could definitely stand to be optimized at some point, as it
   * creates a Phaser.Grahpics object for every pointerdown & pointermove event.
   */
  addPaintCanvas() {
    // Create the canvas for players to draw on.
    let canvas = this.add.graphics();
    canvas.fillStyle(0xe0e0e0, 1.0);
    canvas.fillRoundedRect(200, 100, 400 + 10, 400 + 10, 8);
    canvas.setInteractive(new Phaser.Geom.Rectangle(200, 100, 400, 400), Phaser.Geom.Rectangle.Contains);

    // Add a pointer down event which draws a circle where the cursor is.
    canvas.on('pointerdown', (pointer) => {
      let dot = this.add.graphics();
      dot.fillStyle(this.selectedColorOption);
      dot.fillCircle(pointer.x, pointer.y, this.selectedSizeOption);
    });

    // Add a pointer move event which draws a circle where the pointer moves to
    // and draws a line between the last known dot location to give a smoothed
    // brush stroke effect.
    canvas.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        let dot = this.add.graphics();
        dot.fillStyle(this.selectedColorOption);
        dot.fillCircle(pointer.x, pointer.y, this.selectedSizeOption);

        this.strokeMap.push(dot);

        // If there is a known last dot, draw a line between the current dot and
        // the last.
        if (this.lastDot) {
          let lineShape = new Phaser.Geom.Line(this.lastDot.x, this.lastDot.y, pointer.x, pointer.y);

          let line = this.add.graphics();
          line.lineStyle(this.selectedSizeOption * 2, this.selectedColorOption);
          line.strokeLineShape(lineShape);

          this.strokeMap.push(line)
        }

        // Set the current dot as the last known dot.
        this.lastDot = {
          x: pointer.x,
          y: pointer.y
        }
      }
    });

    // When the user is done drawing, remove any last known dot information.
    canvas.on('pointerup', () => {
      this.lastDot = false;
    });

    // When the cursor leaves the canvas, remove any last known dot information.
    canvas.on('pointerout', () => {
      this.lastDot = false;
    });
  }

  /**
   * Add the brush color and brush size options to the scene.
   */
  addPaintOptions() {
    this.paintOptionsGroup = this.add.group();

    this.addPaintBrushColorOptions();
    this.addPaintBrushSizeOptions();
  }

  /**
   * Add brush size options to the scene.
   */
  addPaintBrushSizeOptions() {
    const sizes = [ 6, 9, 12 ];
    let offsetX = 0;

    for (let size of sizes) {
      let brushSizeOption = this.add.graphics();
      brushSizeOption.fillStyle(0x000000);
      brushSizeOption.fillCircle(650 + offsetX, 500, size);
      brushSizeOption.setInteractive(new Phaser.Geom.Circle(650 + offsetX, 500, size), Phaser.Geom.Circle.Contains);

      // When the user clicks on the graphic, change the size of the brush.
      brushSizeOption.on('pointerdown', () => {
        this.selectedSizeOption = size;
      });

      offsetX += 50;
    }
  }

  /**
   * Add brush color options to the scene.
   */
  addPaintBrushColorOptions() {
    const colors = [ '0x000000', '0x6356c7', '0x87E0FF', '0x7FFFD4','0xFFB0B0', '0xFFAB76', '0xFCF3B0', '0xFFFFFF' ];
    let offsetY= 0;

    for (let i = 0; i < colors.length; i++) {
      let brushColorOption = this.add.graphics(700, 100 + offsetY);
      brushColorOption.fillStyle(colors[i]);
      brushColorOption.fillCircle(700, 100 + offsetY, 15);
      brushColorOption.setInteractive(new Phaser.Geom.Circle(700, 100 + offsetY, 15), Phaser.Geom.Circle.Contains);
      brushColorOption.setScale(1, 1);

      // When the user clicks on the graphic, change the color of the brush.
      brushColorOption.on('pointerdown', () => {
        this.selectedColorOption = colors[i];
      });

      offsetY += 50;
    }
  }

  /**
   * Add title text to the scene.
   */
  addTitleText() {
    let titleText = this.add.dom(400, 70, 'div', 'font-size: 28px', 'DRAW YOUR AVATAR');
    titleText.setClassName('title');
  }

  /**
   * Add a play button to the scene.
   */
  addPlayButton() {
    let playButton = this.add.dom(400, 550, 'button', 'font-size: 16px;', 'SAVE & PLAY');
    playButton.setClassName('game-button');
    playButton.addListener('click');

    playButton.on('click', () => {
      this.scene.start('GameScene', this.socket);
    });
  }

  /**
   * Add a clear button to the scene which jsut resets the MFing scene.
   */
  addClearButton() {
    let clearButton = this.add.dom(700, 550, 'button', 'font-size: 16px;', 'CLEAR');
    clearButton.setClassName('game-button');
    clearButton.addListener('click');

    clearButton.on('click', () => {
      this.scene.restart();
    });
  }
}
