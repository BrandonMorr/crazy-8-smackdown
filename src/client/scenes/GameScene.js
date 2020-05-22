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
  }

  /**
   * Basically need to load any assets here.
   *
   * @see Preload.js for preload functions.
   */
  preload() {
    Preload.loadCards(this);
    Preload.loadSounds(this);
    Preload.loadBrush(this);
  }

  /**
   * Generate the deck, setup players and initialize the game.
   */
  create(data) {
    this.socket = data.socket;
    this.camera = this.cameras.main;

    this.players = [];
    this.deck = new Deck();
    this.yourTurn = false;
    this.gameOver = false;
    this.gameStarted = false;
    this.currentCardInPlay = false;

    // Create local player's Player object and add it to players array.
    this.player = new Player(this, this.getGridRowPosition(1), this.getGridColumnPosition(4), this.socket.id, this.socket.name, data.textureMap);
    this.player.setTexture('avatar');

    // Push this player to the players array.
    this.players.push(this.player);

    // Notify other players that we are connected.
    this.socket.emit('new player', this.player, this.socket.roomCode);

    // Handle new player connections.
    this.socket.on('new player', (playerObj) => {
      this.onNewPlayer(playerObj);
    });

    // Show all the other players.
    this.socket.on('get players', (playerObjs) => {
      this.onGetPlayers(playerObjs);
    });

    // Show that a player is ready.
    this.socket.on('show player ready', (playerObj) => {
      let player = this.getPlayerByID(playerObj.id);
      player.showReady();
    });

    // Show when a player plays a card.
    this.socket.on('show card played', (playerObj, cardObj) => {
      this.onShowCardPlayed(playerObj, cardObj);
    });

    // Show when a player draws a card.
    this.socket.on('show card draw', (playerObj) => {
      this.onShowCardDraw(playerObj);
    });

    // Display 'Making Turn' text to show who has to play.
    this.socket.on('show player turn', (playerObj) => {
      this.onShowPlayerTurn(playerObj);
    });

    // Check player hand for playable cards, otherwise draw a card and move on.
    this.socket.on('turn start', () => {
      this.onTurnStart();
    });

    // Flag that the game has started, remove player text.
    this.socket.on('game started', () => {
      this.onGameStarted();
    });

    // Show a shuffle
    this.socket.on('shuffle deck', () => {
      this.deck.shuffle(this);

      this.showGameMessage('THE DECK HAS BEEN SHUFFLED');
    });

    // Tween cards to the player.
    this.socket.on('add card to hand', (cardObj) => {
      this.dealCardToPlayer(cardObj);
    });

    // Update the current card in play.
    this.socket.on('update card in play', (cardObj) => {
      this.onUpdateCardInPlay(cardObj);
    });

    // Update a player's countdown score.
    this.socket.on('update countdown score', (playerObj) => {
      this.onUpdateCountdownScore(playerObj);
    });

    // Update a player's hand count.
    this.socket.on('update hand count', (playerObj, numberOfCards) => {
      let player = this.getPlayerByID(playerObj.id);

      player.updateHandCount(numberOfCards);
    });

    // End the game, show the winner.
    this.socket.on('game over', (playerObj) => {
      this.onGameOver(playerObj);
    });

    // Show messages from the server.
    this.socket.on('message', (message) => {
      this.showGameMessage(message);
    });

    // Handle removing a player who has disconnected.
    this.socket.on('player quit', (playerObj) => {
      this.onPlayerQuit(playerObj);
    });

    // Show a clickable room code button.
    this.addRoomCodeButton();
  }

  update() { }

  /**
   * When a player connects to the room, add them to the game client.
   */
  onNewPlayer(playerObj) {
    let player = new Player(this, this.getPlayerStartingX(), this.getGridColumnPosition(1), playerObj.id, playerObj.name, playerObj.textureMap);
    this.players.push(player);

    this.drawPlayerAvatar(player);

    this.showGameMessage(`${playerObj.name} HAS CONNECTED`);
    this.showReadyButton();
  }

  /**
   * Get players that are already connected to the room the client has joined.
   */
  onGetPlayers(playerObjs) {
    for (let playerObj of playerObjs) {
      // We only want to add other players.
      if (playerObj.id !== this.player.id) {
        let player = new Player(this, this.getPlayerStartingX(), this.getGridColumnPosition(1), playerObj.id, playerObj.name, playerObj.textureMap);

        // Add the player to the players array.
        this.players.push(player);

        // Draw player avatar
        this.drawPlayerAvatar(player);

        // Check to see if the player is ready.
        if (playerObj.ready) {
          player.showReady();
        }
      }
    }

    // Check to see if the ready button needs to be hidden.
    this.showReadyButton();
  }

  /**
   * Show that a player has played a card.
   */
  onShowCardPlayed(playerObj, cardObj) {
    let player = this.getPlayerByID(playerObj.id);
    let card = new Card(this, player.x, player.y, cardObj.suit, cardObj.value, cardObj.name);

    // Add the card to the play pile.
    this.deck.addCardToPlayPile(card);

    // Play a sound.
    this.sound.play(`card_slide_${Phaser.Math.RND.between(1, 3)}`);

    this.tweens.add({
      targets: card,
      x: this.camera.centerX,
      y: this.camera.centerY,
      ease: 'Linear',
      duration: 250,
      onStart: () => {
        // When the card is clicked, give it a slight rotation.
        this.giveCardRandomAngle(card);
      }
    });
  }

  /**
   * Show that a player has drawn a card (in the event they could not play).
   */
  onShowCardDraw(playerObj) {
    let player = this.getPlayerByID(playerObj.id);
    // Create an arbitrary card.
    let card = new Card(this, this.camera.centerX, this.camera.centerY, 'spades', 'a', 'a of spades');

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
  }

  /**
   * Show the player turn text.
   */
  onShowPlayerTurn(playerObj) {
    for (let player of this.players) {
      if (player.turnText) {
        player.turnText.destroy();
      }
    }

    if (this.player.id === playerObj.id) {
      // It's your turn!
      this.player.showTurn();
      this.yourTurn = true;
    }
    else {
      // It's someone elses turn!
      let player = this.getPlayerByID(playerObj.id);

      player.showTurn();
      this.yourTurn = false;
    }
  }

  /**
   * When the player starts their turn, check the hand for playable cards.
   *
   * In the event the player does not have any cards to play, a draw card
   * button will appear and the user will have to click it to proceed.
   */
  onTurnStart() {
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
  }

  /**
   * When the game starts, setup player UI elements and add a draw pile card.
   */
  onGameStarted() {
    this.gameStarted = true;

    // Ring the bell, the match has begun.
    this.sound.play('bell');

    // Remove the 'READY' text on each player.
    for (let player of this.players) {
      player.readyText.destroy();
      player.showCountdown();
      player.showHandCount();
    }

    this.deck.addDrawPileCard(this);
  }

  /**
   * Update the current card in play.
   */
  onUpdateCardInPlay(cardObj) {
    // If a card in play hasn't been set, we need to add the first one to the
    // scene.
    if (!this.currentCardInPlay) {
      let card = new Card(this, this.camera.centerX, this.camera.centerY, cardObj.suit, cardObj.value, cardObj.name);
      this.deck.addCardToPlayPile(card);
    }

    this.currentCardInPlay = cardObj;
  }

  /**
   * Update a players countdown score, notify client.
   */
  onUpdateCountdownScore(playerObj) {
    let player = this.getPlayerByID(playerObj.id);
    player.updateCountdown();

    // Show a notification that a player's score has gone down.
    if (player.id === this.player.id) {
      this.showCountdownMessage(`YOUR COUNTDOWN SCORE IS NOW ${this.player.countdown}`);
    }
    else {
      this.showCountdownMessage(`${player.name}'S COUNTDOWN SCORE IS NOW ${player.countdown}`);
    }
  }

  /**
   * Game over, remove everything from the scene and show a message (win/lose).
   */
  onGameOver(playerObj) {
    // Remove all the players from the screen.
    for (let player of this.players) {
      player.remove();
    }

    // Remove the played cards from the scene.
    this.deck.remove();

    // Remove any UI elements from the scene.
    this.roomCodeButton.destroy();

    // Remove any messages from the scene.
    if (this.messageText) {
      this.messageText.destroy();
    }
    if (this.countdownMessageText) {
      this.countdownMessageText.destroy();
    }

    let gameOverMessage;

    if (playerObj.id === this.player.id) {
      gameOverMessage = 'CONGRATULATIONS, YOU WIN';
      this.sound.play('winner');
    }
    else {
      gameOverMessage = 'YOU LOSE';
      this.sound.play('loser');
    }

    // Notify whether the player won, or lost.
    this.gameOverText = this.add.dom(this.camera.centerX, this.camera.centerY - 100, 'div', 'font-size: 30px;', gameOverMessage);
    this.gameOverText.setClassName('game-over');

    // Show a button that brings the player back to the main menu scene.
    this.returnToMenuButton = this.add.dom(this.camera.centerX, this.camera.centerY, 'button', 'font-size: 16px; width: 180px;', 'RETURN TO MENU');
    this.returnToMenuButton.setClassName('game-button');
    this.returnToMenuButton.addListener('click');

    this.returnToMenuButton.on('click', () => {
      this.scene.start('MainMenuScene');
    });
  }

  /**
   * Handle removing a player who has disconnected from the room.
   */
  onPlayerQuit(playerObj) {
    // Remove the player from the scene.
    this.getPlayerByID(playerObj.id).remove();

    // Remove player from players array.
    this.players = this.players.filter((player) => player.id !== playerObj.id);

    // If the game hasn't started, clear out the ready stuff when someone
    // leaves the room.
    for (let player of this.players) {
      if (player.ready) {
        player.showUnready();
      }
    }

    // Reorder the players on the screen.
    this.reorderPlayers();

    // Check to see if the ready button needs to be hidden.
    this.showReadyButton();
  }

  /**
   * Tween the card(s) to the player's hand.
   */
  dealCardToPlayer(card) {
    let cardToTween = new Card(this, this.camera.centerX - 100, this.camera.centerY, card.suit, card.value, card.name);

    // Add the card to the player's hand.
    this.player.addCardToHand(cardToTween);

    this.tweens.add({
      targets: cardToTween,
      x: this.camera.centerX,
      y: this.getGridColumnPosition(4),
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
        x: this.camera.centerX,
        y: this.camera.centerY,
        ease: 'Linear',
        duration: 250,
        onStart: () => {
          this.giveCardRandomAngle(card);
        }
      });

      // Adjust the x position for all the cards in hand.
      this.moveCardsInHand();

      // Check to see if a wildcard was played. The wildcard corresponds to your
      // countdown score. Since aces have a value of 'a', we have to perform a
      // separate condition check for that wildcard.
      if (card.value == this.player.countdown || ((card.value == 'a') && this.player.countdown == 1)) {
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
        y: this.getGridColumnPosition(4) - 50,
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
        y: this.getGridColumnPosition(4),
        ease: 'Linear',
        duration: 250,
      });
    });
  }

  /**
   * Draw a player's avatar using the player's texture map.
   */
  drawPlayerAvatar(playerObj) {
    let brush = this.textures.getFrame('brush');
    let textureKey = `avatar_${playerObj.id}`;
    let renderTexture = this.add.renderTexture(0, 0, 400, 400);

    // Hide the render texture from the scene.
    renderTexture.setVisible(false);

    // Using a player's texture map, recreate their avatar by adding all the
    // users brush strokes.
    for (let dot of playerObj.textureMap) {
      renderTexture.draw(brush, dot.x, dot.y, 1, dot.color);
    }

    // Save the render texture and apply it to the player.
    renderTexture.saveTexture(textureKey);
    playerObj.setTexture(textureKey);

    // Clear the tecture map as it bloats the JSON payload.
    playerObj.textureMap = [];
  }

  /**
   * Return an initial x position to place a player.
   */
  getPlayerStartingX() {
    return this.getGridRowPosition(this.players.length);
  }

  /**
   * Reorder the other players in the room.
   *
   * TODO: ideally reorder the players once the order of play has been
   * determined.
   */
  reorderPlayers() {
    const startingX = this.camera.width / 4;
    let offset = 0;

    for (let player of this.players) {
      if (player.id !== this.player.id) {
        // Animate the player to the new x position.
        this.tweens.add({
          targets: player.getTweenTargets(),
          x: startingX + offset,
          ease: 'Linear',
          duration: 250
        });

        offset += startingX;
      }
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
      startX = this.camera.centerX - distanceFromMiddle;
    }
    // If there is an even number of cards, the starting position is slightly
    // off to the left of the middle.
    else {
      // Same craziness as before, but this time we need to reduce the floored
      // value by one (again, not sure why this works but it totally does).
      let distanceFromMiddle = Math.floor(handSize / 2 - 1) * offset;
      startX = (this.camera.centerX - 25) - distanceFromMiddle;
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
   * Rotate a card within a random range (and animate the rotation).
   */
  giveCardRandomAngle(card) {
    this.tweens.add({
      targets: card,
      angle: Phaser.Math.RND.between(-10, 10),
      ease: 'Linear',
      duration: 100
    });
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
      card.value == this.player.countdown ||
      // Check if the countdown is at one (wildcard is ace and 'a' != 1).
      (this.player.countdown == 1 && card.value == 'a');

    return isPlayable;
  }

  /**
   * Return a player by their ID property.
   */
  getPlayerByID(playerId) {
    return this.players.find((player) => player.id === playerId);
  }

  /**
   * Toggle a ready button when there are 2 or more players in the room.
   */
  showReadyButton() {
    if (!this.gameStarted) {
      // We only want to show the ready button when there are more than 2 players
      // in the room.
      if (this.players.length >= 2) {
        // If the button isn't present and the player isn't ready, add it
        // to the scene.
        if (!this.readyButton && !this.player.ready) {
          this.readyButton = this.add.dom(this.getGridRowPosition(3), this.getGridColumnPosition(4) - 60, 'button', 'font-size: 16px;', 'READY');
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
  }

  /**
   * Show the everso flashy & wonderful wildcard menu.
   */
  showWildCardMenu(card) {
    this.suitCardButtons = [];
    this.wildCardMenu = this.add.dom(this.camera.centerX, this.camera.centerY, 'div', 'font-size: 20px;', 'CHOOSE A NEW SUIT');
    this.wildCardMenu.setClassName('wildcard-menu-container');

    const suits = [ 'hearts', 'diamonds', 'spades', 'clubs' ];
    const buttonText = [ '♥ HEARTS', '♦ DIAMONDS', '♠ SPADES', '♣ CLUBS' ];
    let offset = 0;

    for (let i = 0; i <= 3; i++) {
      let suitButton = this.add.dom((this.camera.centerX - 200) + offset, this.camera.centerY + 10, 'button', 'font-size: 16px;', buttonText[i]);
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
   * Show a general message to the user, fade it out after a few seconds.
   */
  showGameMessage(message) {
    // Only display one message at a time.
    if (!this.messageText) {
      this.messageText = this.add.dom(this.camera.centerX, this.camera.centerY + 100, 'div', 'font-size: 16px;', message);
      this.messageText.setClassName('message-game');

      this.tweens.add({
        targets: this.messageText,
        delay: 2000,
        alpha: 0,
        ease: 'Linear',
        duration: 400,
        onComplete: () => {
          this.messageText.destroy();
          this.messageText = false;
        }
      });
    }
  }

  /**
   * Show a message when a player's countdown score has updated.
   */
  showCountdownMessage(message) {
    // Only display one message at a time.
    if (!this.countdownMessageText) {
      this.countdownMessageText = this.add.dom(this.camera.centerX, this.camera.centerY + 50, 'div', 'font-size: 16px;', message);
      this.countdownMessageText.setClassName('message-countdown');

      this.tweens.add({
        targets: this.countdownMessageText,
        delay: 2000,
        alpha: 0,
        ease: 'Linear',
        duration: 400,
        onComplete: () => {
          this.countdownMessageText.destroy();
          this.countdownMessageText = false;
        }
      });
    }
  }

  /**
   * Add room code button to the scene.
   */
  addRoomCodeButton() {
    this.roomCodeButton = this.add.dom(this.getGridRowPosition(3), this.getGridColumnPosition(4), 'button', 'font-size: 16px;', `CLICK TO COPY \n CODE ${this.socket.roomCode.toUpperCase()}`);
    this.roomCodeButton.setClassName('game-button');
    this.roomCodeButton.addListener('click');

    this.roomCodeButton.on('click', () => {
      // Copy room code to the clipboard.
      navigator.clipboard.writeText(this.socket.roomCode);

      this.showGameMessage('CODE COPIED TO CLIPBOARD');
    });
  }

  /**
   * Add draw card button to the scene.
   */
  addDrawCardButton() {
    this.drawCardButton = this.add.dom(this.getGridRowPosition(3), this.getGridColumnPosition(4), 'button', 'font-size: 16px;', 'DRAW CARD');
    this.drawCardButton.setClassName('game-button');
    this.drawCardButton.addListener('click');

    this.drawCardButton.on('click', () => {
      this.socket.emit('draw card');
      this.drawCardButton.destroy();
    });
  }

  /**
   * Return the x position of a line for given row.
   */
  getGridRowPosition(row, numberOfRows = 4) {
    return (this.camera.width / numberOfRows) * row;
  }

  /**
   * Return the y position of a line for given column.
   */
  getGridColumnPosition(column, numberOfColumns = 5) {
    return (this.camera.height / numberOfColumns) * column;
  }
}
