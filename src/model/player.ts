module Crazy8Countdown {

    export class Player {

        id: number;
        name: string;
        coundown: number;
        hand: Array<Card> = [];

        /**
         * @param id - Player ID... not sure if I'll end up using this when
         * multiplay comes in the future.
         */
        constructor(id: number) {

            this.id = id;
            this.coundown = 8;

        }

        /**
         * Remove card from the player's hand and return it.
         * 
         * @param card - card to be removed and played.
         */
        playCard(card: Card): Card {

            let cardToPlay = this.hand.splice(this.hand.indexOf(card), 1);

            return cardToPlay[0];

        }

        /**
         * Add a card to player's hand.
         * 
         * @param card - card to be added to hand.
         */
        addCard(card: Card) {

            this.hand.push(card);

        }

        /**
         * Used for debugging.
         */
        logHand() {

            console.log("Player " + this.id + "'s hand: \n");
            console.log(this.hand);   

        }

    }

}