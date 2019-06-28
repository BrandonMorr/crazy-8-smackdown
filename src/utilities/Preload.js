/**
 * @class - Preload static class to handle asset preloading.
 */
export default class Preload {

  /**
   * Load card assets.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  static loadCards(scene) {
    const names = [ "a", "2", "3", "4", "5", "6", "7", "8", "9", "10", "j", "k", "q" ];
    const suits = [ "hearts", "diamonds", "spades", "clubs" ];

    for (const suit of suits) {
      for (const name of names) {
        const cardName = `${suit}_${name}`;

        scene.load.image(cardName, "assets/cards/" + cardName + ".png");
      }
    }

    scene.load.image("back_blue", "assets/cards/back_blue.png");
    scene.load.image("back_green", "assets/cards/back_green.png");
    scene.load.image("back_red", "assets/cards/back_red.png");
  }

  /**
   * Load player assets.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  static loadPlayers(scene) {
    const colors = [ "black", "blue", "green", "purple", "red", "white", "yellow" ];

    for (const color of colors) {
      scene.load.image(`player_${color}`, `assets/player/player_${color}.png`);
    }
  }

  /**
   * Load sound assets.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  static loadSounds(scene) {
    const sounds = [ "place", "slide" ];

    for (const sound of sounds) {
      for (let i = 1; i <= 3; i++) {
        scene.load.audio(`card_${sound}_${i}`, `assets/sounds/card_${sound}_${i}.ogg`);
      }
    }
  }
}