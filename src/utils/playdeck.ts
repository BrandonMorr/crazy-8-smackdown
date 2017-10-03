module Crazy8Countdown {

    export class PlayDeck {

        playDeck: number[] = [];

        addCards(cards: number[]) {

            this.playDeck = (this.playDeck, cards);

            console.log("Adding cards to playdeck");
            console.log(this.playDeck);

        }

    }

}