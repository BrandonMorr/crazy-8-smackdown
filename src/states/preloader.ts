module Crazy8Countdown {

    export class Preloader extends Phaser.State {

        preload() {

            this.load.spritesheet('playingCardFronts', 'assets/playingCards.png', 140, 190);
            this.load.spritesheet('playingCardBacks', 'assets/playingCardBacks.png', 140, 190);

            this.game.state.start('Main', true, false);

        }

    }

}