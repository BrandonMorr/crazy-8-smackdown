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
   * Load sound assets.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  static loadSounds(scene) {
    for (let i = 1; i <= 3; i++) {
      scene.load.audio(`card_slide_${i}`, `public/assets/sounds/card_slide_${i}.ogg`);
    }

    scene.load.audio('bell', 'public/assets/sounds/bell.ogg');
    scene.load.audio('winner', 'public/assets/sounds/winner.ogg');
    scene.load.audio('loser', 'public/assets/sounds/loser.ogg');
    scene.load.audio('explosion', 'public/assets/sounds/explosion.ogg');
    scene.load.audio('player_message', 'public/assets/sounds/player_message.ogg');
  }

  /**
   * Load other assets.
   *
   * @param {Phaser.Scene} scene - The phaser scene object.
   */
  static loadOther(scene) {
    scene.load.image('brush', 'public/assets/other/brush.png');
    scene.load.image('confeddi', 'public/assets/other/confeddi.png');
  }
}
