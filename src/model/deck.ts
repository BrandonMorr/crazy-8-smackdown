module Crazy8Countdown {

    export class Deck {

        deck: Array<Card> = [];

        generateDrawDeck() {

            let names = ['A', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'J', 'K', 'Q'];
            let suits = ['hearts', 'diamonds', 'spades', 'clubs'];

            for (let i = 0; i < suits.length; i++) {

                for (let ii = 0; ii < names.length; ii++) {

                    this.deck.push(new Card(ii + 1, names[ii], suits[i]));

                }

            }

            this.shuffleDeck();

        }

        generatePlayDeck(drawDeck: Array<Card>) {

            let cardToBeAdded = drawDeck.shift();

            if (cardToBeAdded) {

                this.deck.push(cardToBeAdded);

            }

        }

        shuffleDeck() {

            Phaser.ArrayUtils.shuffle(this.deck);

        }

        dealToPlayer(numberOfCards: number, player: Player) {

            player.addCards(this.deck.splice(0, numberOfCards));

        }

        addCards(cards: Array<Card>) {

            this.deck = (this.deck, cards);

        }

        logDeck() {

            console.log(this.deck);

        }

    }

}