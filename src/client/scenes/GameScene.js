import Phaser from 'phaser';
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
    this.gameOver = false;
    this.gameStarted = false;
    this.checkHandForPlayableCards = false;
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
    this.socket.on('show card played', (playerObj) => {
      for (let player of this.players) {
        if (player.name === playerObj.name) {
          player.turnText.destroy();
        }
      }
    });

    // Display 'Making Turn' text to show who has to play.
    this.socket.on('show player turn', (playerObj) => {
      if (this.player.name === playerObj.name) {
        // It's your turn!
        this.addPlayCardButton();
        this.player.showPlayerTurn();
      }
      else {
        // It's someone elses turn!
        for (let player of this.players) {
          if (player.name === playerObj.name) {
            player.showPlayerTurn();
          }
        }
      }
    });

    // Flag that the game has started, remove player text.
    this.socket.on('game started', () => {
      this.gameStarted = true;
      // Remove the 'READY' text on each player.
      this.players.forEach((player) => {
        player.readyText.destroy();
      });
    });

    // Handler for removing a player who has disconnected.
    this.socket.on('player quit', (playerName) => {
      // Remove the player from the scene.
      this.getPlayerByName(playerName).removePlayer();
      // Remove player from players array.
      this.players = this.players.filter((player) => player.name !== playerName);
    });
  }

  /**
   * Game logic will go in here.
   */
  update() {
    if (this.gameStarted) {
      // Check if the game is over.
      // this.checkGameOver();
      /*
      // Check if the last card has changed.
      if (this.checkLastPlayCardChange()) {
        // A turn has been made, let's make sure to make all the player's cards
        // non-interactive.
        for (let card of this.players[0].hand) {
          card.removeAllListeners();
        }

        // Check for wildcard.
        if (this.currentCardInPlay.value == this.players[0].countdown) {
          this.wildCardDialogContainer.visible = true;
        }
      }

      // Check the player hand for playable cards.
      if (this.checkHandForPlayableCards) {
        for (let card of this.players[0].hand) {
          let currentCardInPlay = this.deck.getLastPlayCard();

          if (card.value == currentCardInPlay.value || card.suit == this.currentSuitInPlay || card.value == this.players[0].countdown) {
            this.makeCardPlayable(card, this.players[0]);
          }
        }
        // Flag that the hand has been checked.
        this.checkHandForPlayableCards = false;
      }
      */
    }
  }

  /**
   * Do any game init within this function.
   */
  initializeGame() {
    // NOTE: Might not need this anymore
  }

  /**
   * Tween the card(s) to the player's hand.
   *
   * @param {Cards[]} cards - The card(s) to tween to our hand.
   */
  dealCardsToPlayer(cards) {
    // TODO
  }

  /**
   * Deal a card from the draw deck to the play pile.
   */
  dealCardFromDrawToPlayPile() {
    // Move the card to the playPile zone.
    this.tweens.add({
      targets: cardToDeal,
      x: '+=125',
      ease: 'Linear',
      duration: 250,
      onComplete: () => {
        cardToDeal.faceCardUp();
      }
    });
  }

  /**
   * Check to see if the last card has changed.
   *
   * @return {Boolean} - True if the card has changed, false otherwise.
   */
  checkLastPlayCardChange() {
    if (this.currentCardInPlay.name != this.deck.getLastPlayCard().name) {
      this.currentCardInPlay = this.deck.getLastPlayCard();
      this.currentSuitInPlay = this.deck.getLastPlayCard().suit;

      return true;
    }

    return false;
  }

  /**
   * Make a card playable by adding click/hover listeners.
   */
  makeCardPlayable(card, player) {
    card.setInteractive();

    // When the user clicks send the card to the play pile and do other stuff.
    card.on('pointerdown', () => {
      // Remove all the listeners.
      card.removeAllListeners();

      // Remove tint.
      card.clearTint();

      // Set the depth of all playPile cards to 0.
      for (let playCard of this.deck.playPile) {
        playCard.setDepth(0);
      }

      // Set the depth of the card to played to 1.
      card.setDepth(1);

      // Move the card to the play pile.
      this.tweens.add({
        targets: card,
        x: 250,
        y: 125,
        ease: 'Linear',
        duration: 250,
      });

      // Remove the card from hand, move into the play pile.
      player.removeCardFromHand(card, this.deck);
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
        this.checkHandForPlayableCards = true;
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
   * Add a make turn button (FOR DEV PURPOSES).
   */
  addPlayCardButton() {
    this.playCardButton = this.add.text(700, 550, 'PLAY CARD', {
      fontFamily: 'Helvetica, "sans-serif"',
      fontSize: '20px',
      fontStyle: 'bold',
      color: '#000000'
    });
    this.playCardButton.setOrigin(0.5);
    this.playCardButton.setInteractive();

    this.playCardButton.on('pointerdown', () => {
      // TODO: tell the server which card we played.
      this.socket.emit('card played');
      // TODO: toggle ready/unready.
      this.playCardButton.destroy();
      this.player.turnText.destroy();
    });

    this.playCardButton.on('pointerover', () => {
      this.playCardButton.setTintFill(0x8b8b8b);
    });

    this.playCardButton.on('pointerout', () => {
      this.playCardButton.clearTint();
    });
  }
}
