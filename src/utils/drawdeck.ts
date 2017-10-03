module Crazy8Countdown {

    export class DrawDeck {

        drawDeck: number[];

        constructor() {

            this.drawDeck = Phaser.ArrayUtils.numberArray(0, 51);

            Phaser.ArrayUtils.shuffle(this.drawDeck);

            // Debug
            console.log("Cards Shuffled:");
            console.log(this.drawDeck);

        }


        updateDrawDeck() {

            // do some updating...

        }

        updatePlayDeck() {

            // do some updating...     

        }

        dealCards(numberOfCards: number): number[] {

            return this.drawDeck.splice(0, numberOfCards);

        }

    }

}