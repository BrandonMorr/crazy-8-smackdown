module Crazy8Countdown {

    export class Boot extends Phaser.State {

        create() {

            // Disable multitouch
            this.input.maxPointers = 1;

            // Game runs while out of focus
            this.stage.disableVisibilityChange = true;

            this.game.state.start('Preloader', true, false);

        }

    }

}
