module Crazy8Countdown {

    export class Preloader extends Phaser.State {

        preload() {

            this.load.spritesheet('playingCardFronts', 'assets/cards/playingCards.png', 140, 190);
            this.load.spritesheet('playingCardBacks', 'assets/cards/playingCardBacks.png', 140, 190);

            this.game.state.start('Main', true, false);

        }

    }

}