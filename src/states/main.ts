module Crazy8Countdown {

    export class Main extends Phaser.State {

        drawDeck = new Deck();
        playDeck = new Deck();

        players: Array<Player> = [];

        gameOver = false;

        create() {

            this.game.stage.backgroundColor = "#EFF7F6";

            // lets run with two players for now
            this.players.push(new Player(0));
            this.players.push(new Player(1));

            // generate draw deck
            this.drawDeck.generateDrawDeck(this.game);

            // deal some cards to the player(s)
            for (let i = 0; i < 2; i++) {

                this.drawDeck.dealToPlayer(this.game, this.players[0]);
                this.drawDeck.dealToPlayer(this.game, this.players[1]);

            }

            // generate a play deck with the next draw deck card
            this.playDeck.generatePlayDeck(this.game, this.drawDeck.deck);

        }

        update() {

            while (!this.isGameOver()) {

                if (this.playDeck.topCard().value === 8) {

                    console.log("Wild Card!");

                } else {

                }

            }



        }

        isGameOver(): boolean {

            let gameOver = false;

            for (let player of this.players) {

                return player.hand.length === 0 && player.coundown === 0;

            }

            return gameOver;

        }

    }

}