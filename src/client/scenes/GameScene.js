import Phaser from 'phaser';
import Card from '../objects/Card.js';
import Deck from '../objects/Deck.js';
import Player from '../objects/Player.js';
import Preload from '../utilities/Preload.js';
import SocketUtils from '../utilities/SocketUtils.js';

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
    this.player.setPlayerTexture(this.players.length);

    // Notify other players that we are connected.
    this.socket.emit('new player', this.player.name, this.socket.roomCode);

    // Handle new player connections.
    this.socket.on('new player', (player) => {
      this.players.push(new Player(this, this.calculatePlayerX(), 100, player.name));

      // NOTE: remove this at some point, will use more dynamic avatars.
      this.players[this.players.length - 1].setPlayerTexture(this.players.length);
    });

    // Show all the other players.
    this.socket.on('get players', (players) => {
      for (let player of players) {
        // We only want to add other players.
        if (player.name !== this.player.name) {
          this.players.push(new Player(this, this.calculatePlayerX(), 100, player.name));

          // NOTE: remove this at some point, will use more dynamic avatars.
          this.players[this.players.length - 1].setPlayerTexture(this.players.length);
        }
      }
    });

    // Show everyone that the player
    this.socket.on('show player ready', (playerName) => {
      let player = this.getPlayerByName(playerName);
      player.showPlayerReady();
    });

    // When a turn has been made, remove the 'Making Turn' text.
    this.socket.on('show card played', (playerObj, cardObj) => {
      for (let player of this.players) {
        if (player.name === playerObj.name) {
          let card = new Card(this, player.x, player.y, cardObj.suit, cardObj.value, cardObj.name);

          // Add the card to the play pile.
          this.deck.addCardToPlayPile(card);

          // Set the new card in play.
          this.currentCardInPlay = card;

          // Play a sound.
          this.sound.play(`card_slide_${Phaser.Math.RND.between(1, 3)}`);

          this.tweens.add({
            targets: card,
            x: 400,
            y: 300,
            ease: 'Linear',
            duration: 250
          });

          player.turnText.destroy();
        }
      }
    });

    // Display 'Making Turn' text to show who has to play.
    this.socket.on('show player turn', (player) => {
      let name = player.name;

      if (this.player.name === name) {
        // It's your turn!
        this.player.showPlayerTurn();
        this.yourTurn = true;

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

        // If no cards are playable, the player needs to draw.
        if (needToDrawCard) {
          
        }
      }
      else {
        // It's someone elses turn!
        for (let player of this.players) {
          if (player.name === name) {
            player.showPlayerTurn();
            this.yourTurn = false;
          }
        }
      }
    });

    // Flag that the game has started, remove player text.
    this.socket.on('game started', () => {
      this.gameStarted = true;
      // Remove the 'READY' text on each player.
      for (let player of this.players) {
        player.readyText.destroy();
      }
    });

    // Tween cards to the player.
    this.socket.on('add card to hand', (card) => {
      this.dealCardToPlayer(card);
    });

    // Update the card in play (card to play on).
    this.socket.on('show first card in play', (cardObj) => {
      let card = new Card(this, 400, 300, cardObj.suit, cardObj.value, cardObj.name);

      this.currentCardInPlay = card;
      this.deck.addCardToPlayPile(card);
    });

    // Handle removing a player who has disconnected.
    this.socket.on('player quit', (playerName) => {
      // Remove the player from the scene.
      this.getPlayerByName(playerName).removePlayer();
      // Remove player from players array.
      this.players = this.players.filter((player) => player.name !== playerName);
    });

    // TODO: only show this button when there are two or more players in room.
    this.addReadyButton();
    this.addRoomCode();
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
    this.player.hand.push(cardToTween);

    this.tweens.add({
      targets: cardToTween,
      x: this.calculateCardX(),
      y: '+=200',
      ease: 'Linear',
      duration: 250,
      onComplete: () => {
        if (this.checkCardPlayable(cardToTween)) {
          this.makeCardInteractive(cardToTween);
        }
      }
    });
  }

  /**
   * Make a card playable by adding click/hover listeners.
   */
  makeCardInteractive(card) {
    if (this.yourTurn) {
      let isPlayable = this.checkCardPlayable(card);

      if (isPlayable) {
        card.setInteractive();

        card.on('pointerdown', () => {
          // Notify players that a card has been played.
          this.socket.emit('card played', card);

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
          });
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
      else {

      }
    }
  }

  /**
   * Constructs a wildcard dialog box.
   */
  buildWildCardDialog() {
    // initialize container object to hold all the dialogue text.
    this.wildCardDialogContainer = this.add.container(0, 0);
    this.wildCardDialogContainer.visible = false;

    // Add a background for the message box.
    let wildCardDialogBackground = this.add.graphics();
    wildCardDialogBackground.fillStyle(0xbdbdbd, 0.8);
    wildCardDialogBackground.fillRoundedRect(200, 250, 400, 150, 4);

    this.wildCardDialogContainer.add(wildCardDialogBackground);

    // Show message text in the center of the screen.
    let wildCardText = this.add.text((this.sys.game.config.width / 2), (this.sys.game.config.height / 2) - 20, 'Wild card played, choose a new suit:');
    wildCardText.setOrigin(0.5);

    this.wildCardDialogContainer.add(wildCardText);

    const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];
    let offset = 10;

    for (let suit of suits) {
      let wildCardOption = this.add.text(this.sys.game.config.width / 2, (this.sys.game.config.height / 2) + offset, suit);
      wildCardOption.setOrigin(0.5);
      wildCardOption.setInteractive();

      wildCardOption.on('pointerdown', () => {
        this.currentSuitInPlay = suit;
        this.wildCardDialogContainer.visible = false;
      });

      wildCardOption.on('pointerover', () => {
        wildCardOption.setTint(0xe3e3e3);
      });

      wildCardOption.on('pointerout', () => {
        wildCardOption.clearTint();
      });

      this.wildCardDialogContainer.add(wildCardOption);

      offset += 20;
    }
  }

  /**
   * Return an x position to place a player.
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
   * Return an x position to place a card in player's hand.
   */
  calculateCardX() {
    let startingX = 170;
    let handSize = this.player.hand.length;
    let offset = handSize * 50;

    return startingX + offset;
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
   * Return a player by their name property.
   */
  getPlayerByName(playerName) {
    return this.players.find((player) => player.name === playerName);
  }

  /**
   * Add a ready button to the scene to ready up.
   *
   * TODO: only show button when more than one player present in the room.
   */
  addReadyButton() {
   this.readyButton = this.add.text(700, 550, 'READY', {
     fontFamily: 'Helvetica, "sans-serif"',
     fontSize: '20px',
     fontStyle: 'bold',
     color: '#000000'
   });
   this.readyButton.setOrigin(0.5);
   this.readyButton.setInteractive();

   this.readyButton.on('pointerdown', () => {
     this.socket.emit('player ready');
     this.player.showPlayerReady();
     // TODO: toggle ready/unready.
     this.readyButton.destroy();
   });

   this.readyButton.on('pointerover', () => {
     this.readyButton.setTintFill(0x8b8b8b);
   });

   this.readyButton.on('pointerout', () => {
     this.readyButton.clearTint();
   });
  }

  /**
   * Add room code text to the scene.
   */
  addRoomCode() {
    this.roomCodeText = this.add.text(700, 580, `ROOM CODE: ${this.socket.roomCode.toUpperCase()}`, {
      fontFamily: 'Helvetica, "sans-serif"',
      fontSize: '14px',
      fontStyle: 'bold',
      color: '#000000'
    });
    this.roomCodeText.setOrigin(0.5);
    this.roomCodeText.setInteractive();

    this.roomCodeText.on('pointerdown', () => {
      // Copy room code to the clipboard.
      navigator.clipboard.writeText(this.socket.roomCode);
    });

    this.roomCodeText.on('pointerover', () => {
      this.roomCodeText.setTintFill(0x8b8b8b);
    });

    this.roomCodeText.on('pointerout', () => {
      this.roomCodeText.clearTint();
    });
  }
}
