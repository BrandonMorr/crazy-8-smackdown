module Crazy8Countdown {

    export class Player {

        id: number;
        name: string;
        hand: Array<Card> = [];

        constructor(id: number) {

            this.id = id;

        }

        playCard(card: Card): Array<Card> {

            let cardToPlayIndex = this.hand.indexOf(card);
            let cardToPlay = Array<Card>(1);

            if (cardToPlayIndex != -1) {

                cardToPlay = this.hand.splice(cardToPlayIndex, 1);

            }

            return cardToPlay;

        }

        addCards(cards: Array<Card>) {

            this.hand = (this.hand, cards);

        }

        logHand() {

            console.log("Player " + this.id + "'s hand:");
            console.log(this.hand);


        }

    }

}