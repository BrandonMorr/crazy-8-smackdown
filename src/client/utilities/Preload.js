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
    const names = [ 'a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'k', 'q' ];
    const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];

    for (const suit of suits) {
      for (const name of names) {
        const cardName = `${suit}_${name}`;

        scene.load.image(cardName, 'public/assets/cards/' + cardName + '.png');
      }
    }

    scene.load.image('back_blue', 'public/assets/cards/back_blue.png');
    scene.load.image('back_green', 'public/assets/cards/back_green.png');
    scene.load.image('back_red', 'public/assets/cards/back_red.png');
  }

  /**
   * Load player assets.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  static loadPlayers(scene) {
    for (let i = 1; i <= 4; i++) {
      scene.load.image(`player_${i}`, `public/assets/player/player_${i}.png`);
    }
  }

  /**
   * Load sound assets.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  static loadSounds(scene) {
    const sounds = [ 'place', 'slide' ];

    for (const sound of sounds) {
      for (let i = 1; i <= 3; i++) {
        scene.load.audio(`card_${sound}_${i}`, `public/assets/sounds/card_${sound}_${i}.ogg`);
      }
    }
  }
}
