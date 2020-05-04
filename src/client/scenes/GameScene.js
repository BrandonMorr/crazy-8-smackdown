import Phaser from 'phaser';
import Card from '../objects/Card.js';
import Deck from '../objects/Deck.js';
import Player from '../objects/Player.js';
import Preload from '../utilities/Preload.js';

/**
 * @class - Game scene which contains the core game loop.
 */
export default class GameScene extends Phaser.Scene {

  constructor() {
    super({
      key: 'GameScene',
    });

    this.players = [];
    this.deck = new Deck();
    this.yourTurn = false;
    this.gameOver = false;
    this.gameStarted = false;
    this.currentCardInPlay = false;
  }

  /**
   * Basically need to load any assets here.
   *
   * @see Preload.js for preload functions.
   */
  preload() {
    Preload.loadCards(this);
    Preload.loadPlayers(this);
    Preload.loadSounds(this);
  }

  /**
   * Generate the deck, setup players and initialize the game.
   */
  create(socket) {
    this.socket = socket;

    // Create local player's Player object and add it to players array.
    this.player = new Player(this, 100, 500, this.socket.name);
    this.players.push(this.player);

    // NOTE: remove this at some point, will use more dynamic avatars.
    this.player.setPlayerTexture(1);

    // Notify other players that we are connected.
    this.socket.emit('new player', this.player.name, this.socket.roomCode);

    // Handle new player connections.
    this.socket.on('new player', (playerObj) => {
      this.players.push(new Player(this, this.calculatePlayerX(), 100, playerObj.name));

      // NOTE: remove this at some point, will use more dynamic avatars.
      this.players[this.players.length - 1].setPlayerTexture(this.players.length);
      this.showMessage(`${playerObj.name} HAS CONNECTED`);

      // Show the ready button.
      this.showReadyButton();
    });

    // Show all the other players.
    this.socket.on('get players', (playerObjs) => {
      for (let playerObj of playerObjs) {
        // We only want to add other players.
        if (playerObj.name !== this.player.name) {
          let player = new Player(this, this.calculatePlayerX(), 100, playerObj.name);

          // Add the player to the players array.
          this.players.push(player);

          // Check to see if the player is ready.
          if (playerObj.ready) {
            player.showReady();
          }

          // NOTE: remove this at some point, will use more dynamic avatars.
          this.players[this.players.length - 1].setPlayerTexture(this.players.length);
        }
      }

      // Check to see if the ready button needs to be hidden.
      this.showReadyButton();
    });

    // Show that a player is ready.
    this.socket.on('show player ready', (playerObj) => {
      let player = this.getPlayerByName(playerObj.name);
      player.showReady();
    });

    // Show when a player plays a card.
    this.socket.on('show card played', (playerObj, cardObj) => {
      let player = this.getPlayerByName(playerObj.name);
      let card = new Card(this, player.x, player.y, cardObj.suit, cardObj.value, cardObj.name);

      // Add the card to the play pile.
      this.deck.addCardToPlayPile(card);

      // Play a sound.
      this.sound.play(`card_slide_${Phaser.Math.RND.between(1, 3)}`);

      this.tweens.add({
        targets: card,
        x: 400,
        y: 300,
        ease: 'Linear',
        duration: 250,
        onStart: () => {
          // When the card is clicked, give it a slight rotation.
          this.giveCardRandomAngle(card);
        }
      });
    });

    // Show when a player draws a card.
    this.socket.on('show card draw', (playerObj) => {
      let player = this.getPlayerByName(playerObj.name);
      // Create an arbitrary card.
      let card = new Card(this, 400, 300, 'spades', 'a', 'a of spades');

      // Load the back of the card.
      card.faceDown();

      this.tweens.add({
        targets: card,
        x: player.x,
        y: player.y,
        ease: 'Linear',
        duration: 250,
        onComplete: () => {
          card.destroy();
        }
      });
    });

    // Display 'Making Turn' text to show who has to play.
    this.socket.on('show player turn', (playerObj) => {
      for (let player of this.players) {
        if (player.turnText) {
          player.turnText.destroy();
        }
      }

      if (this.player.name === playerObj.name) {
        // It's your turn!
        this.player.showTurn();
        this.yourTurn = true;
      }
      else {
        // It's someone elses turn!
        let player = this.getPlayerByName(playerObj.name);

        player.showTurn();
        this.yourTurn = false;
      }
    });

    // Check player hand for playable cards, otherwise draw a card and move on.
    this.socket.on('turn start', () => {
      let needToDrawCard = true;

      // Check for playable cards.
      for (let card of this.player.hand) {
        let isPlayable = this.checkCardPlayable(card);

        // If the card is playable, make it interactive.
        if (isPlayable) {
          this.makeCardInteractive(card);
          needToDrawCard = false;
        }
      }

      // If no cards are playable, the player needs to draw a card.
      if (needToDrawCard) {
        this.addDrawCardButton();
      }
    });

    // Flag that the game has started, remove player text.
    this.socket.on('game started', () => {
      this.gameStarted = true;

      // Ring the bell, the match has begun.
      let bellSound = this.sound.play('bell');

      // Remove the 'READY' text on each player.
      for (let player of this.players) {
        player.readyText.destroy();
        player.showCountdown();
        player.showHandCount();
      }
    });

    // Tween cards to the player.
    this.socket.on('add card to hand', (cardObj) => {
      this.dealCardToPlayer(cardObj);
    });

    // Update the current card in play.
    this.socket.on('update card in play', (cardObj) => {
      // If a card in play hasn't been set, we need to add the first one to the
      // scene.
      if (!this.currentCardInPlay) {
        let card = new Card(this, 400, 300, cardObj.suit, cardObj.value, cardObj.name);
        this.deck.addCardToPlayPile(card);
      }

      this.currentCardInPlay = cardObj;
    });

    // Update a player's countdown score.
    this.socket.on('update countdown score', (playerObj) => {
      let player = this.getPlayerByName(playerObj.name);

      player.updateCountdown();
    });

    // Update a player's hand count.
    this.socket.on('update hand count', (playerObj, numberOfCards) => {
      let player = this.getPlayerByName(playerObj.name);

      player.updateHandCount(numberOfCards);
    })

    // Show messages from the server.
    this.socket.on('message', (message) => {
      this.showMessage(message);
    });

    // Handle removing a player who has disconnected.
    this.socket.on('player quit', (playerObj) => {
      // Remove the player from the scene.
      this.getPlayerByName(playerObj.name).remove();

      // Remove player from players array.
      this.players = this.players.filter((player) => player.name !== playerObj.name);

      // If the game hasn't started, clear out the ready stuff when someone
      // leaves the room.
      for (let player of this.players) {
        if (player.ready) {
          player.showUnready();
        }
      }

      // Check to see if the ready button needs to be hidden.
      this.showReadyButton();
    });

    // Show a clickable room code button.
    this.addRoomCodeButton();
  }

  update() {

  }

  /**
   * Tween the card(s) to the player's hand.
   *
   * @param {Card} card - The card to tween to our hand.
   */
  dealCardToPlayer(card) {
    let cardToTween = new Card(this, 400, 300, card.suit, card.value, card.name);

    // Add the card to the player's hand.
    this.player.addCardToHand(cardToTween);

    this.tweens.add({
      targets: cardToTween,
      x: 400,
      y: 500,
      ease: 'Linear',
      duration: 250,
      onComplete: () => {
        this.moveCardsInHand();
      }
    });
  }

  /**
   * Make a card playable by adding click/hover listeners.
   */
  makeCardInteractive(card) {
    card.setInteractive();

    card.on('pointerdown', () => {
      // Remove the turn text.
      this.player.turnText.destroy();

      // Remove tint.
      card.clearTint();

      // Remove the listeners on all cards.
      for (let card of this.player.hand) {
        card.removeAllListeners();
      }

      // Remove the card from the player's hand array.
      this.player.removeCardFromHand(card, this.deck);

      // Play a sound.
      this.sound.play(`card_slide_${Phaser.Math.RND.between(1, 3)}`);

      // Move the card to the play pile.
      this.tweens.add({
        targets: card,
        x: 400,
        y: 300,
        ease: 'Linear',
        duration: 250,
        onStart: () => {
          this.giveCardRandomAngle(card);
        }
      });

      this.moveCardsInHand();

      // Check to see if a wildcard was played.
      if (card.value == this.player.countdown) {
        this.showWildCardMenu(card);
      }
      else {
        // Notify players that a card has been played.
        this.socket.emit('card played', card);
      }
    });

    // When the user hovers the cursor over the card, set a tint and raise y.
    card.on('pointerover', () => {
      // Set a tint to show card is playable.
      card.setTint(0xe3e3e3);

      // Move card up slightly.
      this.tweens.add({
        targets: card,
        y: 450,
        ease: 'Linear',
        duration: 250,
      });
    });

    // When the user's cursor leaves the card, remove the tint and lower y.
    card.on('pointerout', () => {
      // Remove tint.
      card.clearTint();

      // Move the card back into hand.
      this.tweens.add({
        targets: card,
        y: 500,
        ease: 'Linear',
        duration: 250,
      });
    });
  }

  /**
   * Return an x position to place a player.
   *
   * TODO: work this into something more dynamic.
   */
  calculatePlayerX() {
    if (this.players.length === 1) {
      return 100;
    }
    else if (this.players.length === 2) {
      return 400;
    }
    else {
      return 700;
    }
  }

  /**
   * Update the position of every card so that they're sorted evenly & visible.
   */
  moveCardsInHand() {
    let hand = this.player.hand;
    let handSize = this.player.hand.length;

    // If the hand is bigger than 8 cards, we should reduce the offset in half.
    let offset = (handSize <= 8) ? 50 : 25;

    // Start X represents where the first card in the hand should go, every
    // card after that will be offset by 50 (or less).
    let startX;

    // If there is an odd number of cards, the starting position is in the
    // middle of the x axis.
    if (handSize % 2 === 1) {
      // To figure out where the first card will go, divide the number of
      // cards in the hand by two & floor the value to determine the amount
      // of cards that could be drawn from the middle point of the screen.
      // Multiply the number of cards by the offset (in px.) and you get
      // starting x position (I don't actually know why this works ^_^).
      let distanceFromMiddle = Math.floor(handSize / 2) * offset;
      startX = 400 - distanceFromMiddle;
    }
    // If there is an even number of cards, the starting position is slightly
    // off to the left of the middle.
    else {
      // Same craziness as before, but this time we need to reduce the floored
      // value by one (again, not sure why this works but it totally does).
      let distanceFromMiddle = Math.floor(handSize / 2 - 1) * offset;
      startX = 375 - distanceFromMiddle;
    }

    // Loop through every card in the hand, tween them to new x positions.
    for (let i = 0; i <= handSize; i++) {
      this.tweens.add({
        targets: hand[i],
        x: startX + (offset * i),
        ease: 'Linear',
        duration: 250
      });
    }
  }

  /**
   * Check to see if a card is playable, otherwise return false.
   */
   checkCardPlayable(card) {
     let isPlayable =
       // Check if card matches the current suit in play.
       card.suit == this.currentCardInPlay.suit ||
       // Check if card matches the current value in play.
       card.value == this.currentCardInPlay.value ||
       // Check if the card is wild (wildcard = countdown score).
       card.value == this.player.countdown;

     return isPlayable;
   }

   /**
    * Rotate a card within a random range (and animate the rotation).
    */
   giveCardRandomAngle(card) {
     this.tweens.add({
       targets: card,
       angle: Phaser.Math.RND.between(-10, 10),
       ease: 'Linear',
       duration: 100
     })
   }

  /**
   * Return a player by their name property.
   */
  getPlayerByName(playerName) {
    return this.players.find((player) => player.name === playerName);
  }

  /**
   * Toggle a ready button when there are 2 or more players in the room.
   */
  showReadyButton() {
    // We only want to show the ready button when there are more than 2 players
    // in the room.
    if (this.players.length >= 2) {
      // If the button isn't present and the player isn't ready, add it
      // to the scene.
      if (!this.readyButton && !this.player.ready) {
        this.readyButton = this.add.dom(710, 490, 'button', 'font-size: 16px;', 'READY');
        this.readyButton.setClassName('game-button');
        this.readyButton.addListener('click');

        this.readyButton.on('click', () => {
         this.socket.emit('player ready');
         this.player.showReady();
         this.readyButton.destroy();
         this.readyButton = false;
        });
      }
    }
    else {
      // Check if the ready button is present and if so remove it.
      if (this.readyButton) {
        this.readyButton.destroy();
        this.readyButton = false;
      }
    }
  }

  /**
   * Show the everso flashy & wonderful wildcard menu.
   */
  showWildCardMenu(card) {
    this.suitCardButtons = [];
    this.wildCardMenu = this.add.dom(400, 300, 'div', 'font-size: 20px;', 'CHOOSE A NEW SUIT');
    this.wildCardMenu.setClassName('wildcard-menu-container');

    const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];
    const buttonText = [ '♥ HEARTS', '♦ DIAMONDS', '♠ SPADES', '♣ CLUBS' ];
    let offset = 0;

    for (let i = 0; i <= 3; i++) {
      let suitButton = this.add.dom(200 + offset, 310, 'button', 'font-size: 16px;', buttonText[i]);
      suitButton.setClassName('suit-button');
      suitButton.addListener('click');

      suitButton.on('click', () => {
        this.socket.emit('card played', card, suits[i]);

        // Remove the menu & buttons.
        this.wildCardMenu.destroy();

        this.suitCardButtons.forEach((button) => {
          button.destroy();
        });
      });

      this.suitCardButtons.push(suitButton);

      offset += 135;
    }
  }

  /**
   * Display error message to the use, fade it out after a few seconds.
   */
  showMessage(message) {
    // Only display one message at a time.
    if (!this.message) {
      this.message = this.add.dom(400, 400, 'div', 'font-size: 16px;', message);
      this.message.setClassName('message');

      this.tweens.add({
        targets: this.message,
        delay: 2000,
        alpha: 0,
        ease: 'Linear',
        duration: 400,
        onComplete: () => {
          this.message.destroy();
          this.message = false;
        }
      });
    }
  }

  /**
   * Add room code button to the scene.
   */
  addRoomCodeButton() {
    this.roomCodeButton = this.add.dom(710, 550, 'button', 'font-size: 16px;', `CLICK TO COPY \n CODE ${this.socket.roomCode.toUpperCase()}`);
    this.roomCodeButton.setClassName('game-button');
    this.roomCodeButton.addListener('click');

    this.roomCodeButton.on('click', () => {
      // Copy room code to the clipboard.
      navigator.clipboard.writeText(this.socket.roomCode);
      this.showMessage('CODE COPIED TO CLIPBOARD')
    });
  }

  /**
   * Add draw card button to the scene.
   */
  addDrawCardButton() {
    this.drawCardButton = this.add.dom(710, 490, 'button', 'font-size: 16px;', 'DRAW CARD');
    this.drawCardButton.setClassName('game-button');
    this.drawCardButton.addListener('click');

    this.drawCardButton.on('click', () => {
      this.socket.emit('draw card');
      this.drawCardButton.destroy();
    });
  }
}
