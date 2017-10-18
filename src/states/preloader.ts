module Crazy8Countdown {

    export class Preloader extends Phaser.State {

        preload() {

            const names = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'k', 'q'];
            const suits = ['hearts', 'diamonds', 'spades', 'clubs'];

            for (let i = 0; i < suits.length; i++) {
                
                for (let ii = 0; ii < names.length; ii++) {

                    this.load.image(`${suits[i]}_${names[ii]}`, `assets/cards/${suits[i]}_${names[ii]}.png`);

                }

            }

            
            this.load.image('back_blue', 'assets/cards/back_blue.png');
            this.load.image('back_green', 'assets/cards/back_green.png');
            this.load.image('back_red', 'assets/cards/back_red.png');

        }

        create() {

            this.game.state.start('Main', true, false);

        }

    }

}