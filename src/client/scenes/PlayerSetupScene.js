import Phaser from 'phaser';

/**
 * @class - Player setup scene, where the user will enter a username and draw
 *  their avatar.
 */
export default class PlayerSetupScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'PlayerSetupScene',
    });

    this.buttonTextStyle = {
      fontFamily: 'Helvetica, "sans-serif"',
      fontSize: '18px',
      fontStyle: 'bold',
      color: '0x000000'
    };
  }

  preload() {

  }

  create() {
    // Initialize some default properties.
    this.lastDot = false;
    this.selectedSizeOption = 6;
    this.selectedColorOption = '0x000000';

    this.addPaintCanvas();
    this.addPaintOptions();
    this.addConnectButton();
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
    canvas.lineStyle(4, 0x000000);
    canvas.strokeRoundedRect(200 - 5, 100 - 5, 400 + 10, 400 + 10, 8);
    canvas.setInteractive(new Phaser.Geom.Rectangle(200, 100, 400, 400), Phaser.Geom.Rectangle.Contains);

    // Add a pointer down event which draws a circle where the cursor is.
    canvas.on('pointerdown', (pointer) => {
        let dot = this.add.graphics();
        dot.fillStyle(this.selectedColorOption);
        dot.fillCircle(pointer.x, pointer.y, this.selectedSizeOption);
    }, this);

    // Add a pointer move event which draws a circle where the pointer moves to
    // and draws a line between the last known dot location to give a smoothed
    // brush stroke effect.
    canvas.on('pointermove', (pointer) => {
      if (pointer.isDown) {
        let dot = this.add.graphics();
        dot.fillStyle(this.selectedColorOption);
        dot.fillCircle(pointer.x, pointer.y, this.selectedSizeOption);

        // If there is a known last dot, draw a line between the current dot and
        // the last.
        if (this.lastDot) {
          let lineShape = new Phaser.Geom.Line(this.lastDot.x, this.lastDot.y, pointer.x, pointer.y);

          this.line = this.add.graphics();
          this.line.lineStyle(this.selectedSizeOption * 2, this.selectedColorOption);
          this.line.strokeLineShape(lineShape);
        }

        // Set the current dot as the last known dot.
        this.lastDot = {
          x: pointer.x,
          y: pointer.y
        }
      }
    }, this);

    // When the user is done drawing, remove any last known dot information.
    canvas.on('pointerup', () => {
      this.lastDot = false;
    }, this);

    // When the cursor leaves the canvas, remove any last known dot information.
    canvas.on('pointerout', () => {
      this.lastDot = false;
    }, this);
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

    for (let i = 0; i < sizes.length; i++) {
      let brushSizeOption = this.add.graphics();
      brushSizeOption.fillStyle(0x000000);
      brushSizeOption.fillCircle(650 + offsetX, 500, sizes[i]);
      brushSizeOption.setInteractive(new Phaser.Geom.Circle(650 + offsetX, 500, sizes[i]), Phaser.Geom.Circle.Contains);

      // When the user clicks on the graphic, change the size of the brush..
      brushSizeOption.on('pointerdown', () => {
        this.selectedSizeOption = sizes[i];
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
   * Add a start button which loads the connection scene.
   */
  addConnectButton() {
    let connectButton = this.add.text(400, 550, 'PLAY', this.buttonTextStyle);
    connectButton.setOrigin(0.5);
    connectButton.setInteractive();

    connectButton.on('pointerdown', () => {
      this.scene.start('GameScene');
    });

    connectButton.on('pointerover', () => {
      connectButton.setTintFill(0x8b8b8b);
    });

    connectButton.on('pointerout', () => {
      connectButton.clearTint();
    });
  }

  /**
   * Add a clear button to the scene which clears the paint canvas.
   */
  addClearButton() {
    let clearButton = this.add.text(700, 550, 'CLEAR', this.buttonTextStyle);
    clearButton.setOrigin(0.5);
    clearButton.setInteractive();

    clearButton.on('pointerdown', () => {
      this.scene.restart();
    });

    clearButton.on('pointerover', () => {
      clearButton.setTintFill(0x8b8b8b);
    });

    clearButton.on('pointerout', () => {
      clearButton.clearTint();
    });
  }
}
