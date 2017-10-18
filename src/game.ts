module Crazy8Countdown {

	class Game extends Phaser.Game {

		constructor() {

			super(800, 600, Phaser.AUTO, '', null);

			this.state.add('Boot', Boot, false);
			this.state.add('Preloader', Preloader, false);
			this.state.add('Main', Main, false);

			this.state.start('Boot');

		}

	}

	window.onload = () => {

		var game = new Game();

	}

}