module Crazy8Countdown {

    export class Main extends Phaser.State {

        drawDeck = new Deck();
        playDeck = new Deck();

        players: Array<Player> = [];

        create() {

            const NUMBER_OF_PLAYERS = 4;

            // get some players together
            for (let i = 0; i < NUMBER_OF_PLAYERS; i++) {

                this.players.push(new Player(i + 1));

            }

            // generate draw deck
            this.drawDeck.generateDrawDeck();

            // deal some cards to the players
            for (let i = 0; i < this.players.length; i++) {

                this.drawDeck.dealToPlayer(8, this.players[i]);
                this.players[i].logHand();

            }

            // generate a play deck with the next draw deck card
            this.playDeck.generatePlayDeck(this.drawDeck.deck);

        }


    }

}