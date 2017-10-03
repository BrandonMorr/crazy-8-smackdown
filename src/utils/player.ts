module Crazy8Countdown {

    export class Player {

        id: number;
        name: string;
        hand: number[] = [];

        constructor(id: number) {

            this.id = id;

        }

        addCards(cards: number[]) {

            this.hand = (this.hand, cards);

            // Debug
            console.log("Hand Updated");
            console.log(this.hand);
            

        }

        playCard(card: number): number {

            var cardToPlay = this.hand.indexOf(card);

            if (cardToPlay != -1) {

                this.hand.splice(cardToPlay, 1);

            }

            return cardToPlay;

        }

    }

}