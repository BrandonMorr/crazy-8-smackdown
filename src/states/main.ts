module Crazy8Countdown {

    export class Main extends Phaser.State {

        drawDeck = new DrawDeck();
        playDeck = new PlayDeck();
        player = new Player(1);

        create() {

            // player is given cards
            this.player.addCards(this.drawDeck.dealCards(8));

            // playdrawDeck is initialized after dealing is complete
            this.playDeck.addCards(this.drawDeck.dealCards(1));

            // player plays a card onto the playdeck, no rules apply
            this.playDeck.addCards(this.player.playCard(this.player.hand[0]));

        }


    }

}