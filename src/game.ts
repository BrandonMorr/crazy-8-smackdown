module Crazy8Countdown {

	export class Game extends Phaser.Game {

		game: Phaser.Game;
		deck: Phaser.ArrayUtils;

		constructor() {

			super(1280, 720, Phaser.AUTO, '', null);

			this.state.add('Boot', Crazy8Countdown.Boot, false);
			this.state.add('Preloader', Crazy8Countdown.Preloader, false);
			this.state.add('Main', Crazy8Countdown.Main, false);

			this.state.start('Boot');

		}

	}

	window.onload = () => {

		var game = new Crazy8Countdown.Game();

	}

}