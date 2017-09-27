module Crazy8Countdown {

    export class Main extends Phaser.State {

        deck:Phaser.ArrayUtils;

        create() {

            this.deck = Phaser.ArrayUtils.numberArray(0, 51);

            console.log('made it here');

        }

    }

}