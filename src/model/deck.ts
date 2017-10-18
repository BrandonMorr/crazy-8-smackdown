module Crazy8Countdown {

    export class Deck {

        deck: Array<Card> = [];

        /**
         * Generate a draw Deck.
         * 
         * TODO: At some point... should use inheritence to break the draw Deck and play Deck into subclasses.
         * 
         * @param game - Phaser Game object.
         */
        generateDrawDeck(game: Phaser.Game) {

            let names = ['a', '2', '3', '4', '5', '6', '7', '8', '9', '10', 'j', 'k', 'q'];
            let suits = ['hearts', 'diamonds', 'spades', 'clubs'];

            for (let i = 0; i < suits.length; i++) {

                for (let ii = 0; ii < names.length; ii++) {

                    this.deck.push(new Card(game, (200 + i), (20 + i), `${suits[i]}_${names[ii]}`, ii + 1, names[ii], suits[i]));

                }

            }

            this.shuffleDeck();

        }

        /**
         * Generate a play Deck.
         * 
         * Take the top card of the draw deck and use it as initial card to start gameplay. 
         * 
         * @param game - Phase Game object.
         * @param drawDeck - The drawDeck collection of cards to take the card from.
         */
        generatePlayDeck(game: Phaser.Game, drawDeck: Array<Card>) {

            const cardToAdd = drawDeck.pop();

            if (cardToAdd) {

                this.deck.push(cardToAdd);

                let tween = game.add.tween(cardToAdd).to({ x: 450, y: 20 }, 400, Phaser.Easing.Cubic.In);
                tween.onComplete.add(function () { cardToAdd.faceCardUp(); }, this);
                tween.start();

            } else {

                console.log("This shouldn't happen...");

            }

        }

        /**
         * Return the Card on the top of the deck.
         */
        topCard(): Card {

            return this.deck[this.deck.length - 1];

        }

        /**
         * Deal a card to the Player, Tween the card to the player's hand.
         * 
         * TODO: ...so much...
         * 
         * @param game - Phaser Game object.
         * @param player - Player we are dealing to.
         */
        dealToPlayer(game: Phaser.Game, player: Player) {

            const cardToAdd = this.deck.pop();

            // this will be gross, but will work for now.
            let xPos = (player.id * 500) + (player.hand.length * 100);

            if (cardToAdd) {

                player.addCard(cardToAdd);

                let tween = game.add.tween(cardToAdd).to({ x: xPos, y: 400 }, 400, Phaser.Easing.Cubic.In);
                tween.onComplete.add(function () { cardToAdd.faceCardUp(); }, this);
                tween.start();

            } else {

                console.log("Ran out of cards to deal!");

            }

        }

        /**
         * Add array of card(s) to the deck.
         * 
         * @param cards - array of card(s) to add to the deck.
         */
        addCards(cards: Array<Card>) {

            this.deck = (this.deck, cards);

        }

        /**
         * Shuffle the deck. Somehow this works?
         */
        shuffleDeck() {

            Phaser.ArrayUtils.shuffle(this.deck);

        }

        /**
         * Used for debugging.
         */
        logDeck() {

            console.log("Deck contents:");
            console.log(this.deck);

        }

    }

}