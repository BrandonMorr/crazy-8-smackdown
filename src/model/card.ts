module Crazy8Countdown {

    export class Card extends Phaser.Sprite {

        value: number;
        name: string;
        suit: string;

        constructor(game: Phaser.Game, x: number, y: number, key: string, value: number, name: string, suit: string) {

            super(game, x, y, key, 0);

            this.value = value;
            this.name = name;
            this.suit = suit;
            
            this.anchor.setTo(0);

            this.faceCardDown();            
            game.add.existing(this);

        }

        /**
         * Load the card back texture to face card down.
         */
        faceCardDown() {

            this.loadTexture('back_red');

        }

        /**
         * Load the corresponding texture for this card.
         */
        faceCardUp() {
            
            this.loadTexture(`${this.suit}_${this.name}`);

        }

    }

}