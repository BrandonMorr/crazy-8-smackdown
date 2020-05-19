import Http from 'http';
import Path from 'path';
import Helmet from 'helmet';
import Crypto from 'crypto';
import Express from 'express';
import SocketIO from 'socket.io';
import Compression from 'compression';

import Room from './objects/Room';
import Deck from './objects/Deck';
import Player from './objects/Player';

// Array to track active rooms.
let rooms = [];

// Server setup.
const app = Express();
const server = Http.Server(app);
const io = SocketIO(server);
const port = process.env.PORT || 3000;

// Fire up Helmet and Compression for better Express security and performance.
app.use(Helmet());
app.use(Compression());

// Add static file middleware (to serve static files).
app.use('/public', Express.static(Path.join(__dirname, '../public')));

// Request router.
app.get('/', function(request, response) {
   response.sendFile(Path.join(__dirname, '../public/index.html'));
})

// Tell server to start listening for connections.
server.listen(port, () => {
  console.log('\n🕺 server init complete, listening for connections on port ' + port + ' 🕺\n');

  // Start listening for events from client.
  setServerHandlers();
});

/**
 * Setup server event handlers.
 */
function setServerHandlers() {
  io.on('connection', (socket) => {
    socket.on('new game', onNewGame);
    socket.on('join request', onJoinRequest);
    socket.on('new player', onNewPlayer);
    socket.on('player ready', onPlayerReady);
    socket.on('card played', onCardPlayed);
    socket.on('draw card', onDrawCard);
    socket.on('disconnect', onDisconnect);
  });
}

/**
 * Handle creating a new game.
 */
function onNewGame(roomCode) {
  // If no room code has been provided, generate a random one.
  if (!roomCode) {
    Crypto.randomBytes(2, (err, buf) => {
      // Generate a random room code.
      let roomCode = buf.toString('hex');

      // Add room to rooms array.
      rooms[roomCode] = new Room(roomCode);

      // Connect the user to the room.
      this.join(roomCode);

      // Send the room code back to the client.
      this.emit('new game', roomCode);
    });
  }
  else {
    let foundRoom = Object.keys(rooms).find(room => room === roomCode);

    if (foundRoom) {
      // Notify the user that the room already exists.
      this.emit('room error', 'ROOM ALREADY EXISTS');
    }
    else {
      // Add room to rooms array.
      rooms[roomCode] = new Room(roomCode);

      // Connect the user to the room.
      this.join(roomCode);

      // Send the room code back to the client.
      this.emit('new game', roomCode);
    }
  }
}

/**
 * Handle joining an existing game.
 */
function onJoinRequest(roomCode) {
  // Check to see if the supplied room code is actively in use.
  let foundRoom = Object.keys(rooms).find(room => room === roomCode);

  // If room code is valid and the game hasn't started, connect the user.
  if (foundRoom) {
    let socketsInRoom = getSocketsInRoom(roomCode).length;

    // If there are less than 4 sockets connected to the room, connect.
    if (socketsInRoom < 4) {
      if (rooms[foundRoom].gameStarted === false) {
        // Connect the user to the room.
        this.join(roomCode);

        // Send the room code back to the client.
        this.emit('join game', roomCode);
      }
      else {
        // Notify the user that the room's game is in progress.
        this.emit('room error', 'GAME IS IN PROGRESS');
      }
    }
    else {
      // Notify the user that the room is full.
      this.emit('room error', 'ROOM IS FULL');
    }
  }
  else {
    // Notify the user that the room does not exist.
    this.emit('room error', 'GAME DOES NOT EXIST');
  }
}

/**
 * Notify others that a new player has connected.
 *
 * Send the client back a list of existing players in the room.
 */
function onNewPlayer(playerObj, roomCode) {
  this.player = new Player(this.id, playerObj.name, roomCode, playerObj.textureMap);

  // Build up a list of all current players, send the data to the client.
  this.emit('get players', getPlayersInRoom(roomCode));

  // Broadcast new player to other new players.
  this.broadcast.to(roomCode).emit('new player', this.player);
}

/**
 * Notify others that a player is ready to smack down.
 *
 * If all players are ready, randomly pick a player to go first and notify all
 * players that the game has stared.
 */
function onPlayerReady() {
  let roomCode = this.player.roomCode;

  this.player.ready = true;

  // Let everyone else know the player is ready.
  this.broadcast.to(roomCode).emit('show player ready', this.player);

  // Check to see if all players are ready.
  if (checkAllPlayersReady(roomCode)) {
    // Flag that the room's game has started.
    rooms[roomCode].gameStarted = true;

    // Clear the player's texture map to clean up JSON payload.
    for (let player of getPlayersInRoom(roomCode)) {
      player.textureMap = [];
    }

    // Notify everyone that the game has started.
    io.in(roomCode).emit('game started');

    // Determine the player order.
    rooms[roomCode].playerOrder = shufflePlayerOrder(roomCode);

    let firstPlayer = rooms[roomCode].playerOrder[0];

    // Notify all players who's turn it is.
    io.in(roomCode).emit('show player turn', firstPlayer);

    // Generate a deck object, store it in the room data.
    rooms[roomCode].deck = new Deck();

    // Deal out 8 cards to players.
    for (let i = 0; i <= 7; i++) {
      for (let player of rooms[roomCode].playerOrder) {
        dealCardsToPlayer(player);
      }
    }

    // Shift out a card from the draw pile, the first card in play.
    let firstCardInPlay = rooms[roomCode].deck.drawPile.shift();

    // Notify all players players of the first card in play.
    io.in(roomCode).emit('update card in play', firstCardInPlay);

    // Move the card to the play pile.
    rooms[roomCode].deck.playPile.unshift(firstCardInPlay);

    // Notify all players what the first card to play is.
    io.in(roomCode).emit('show first card in play', firstCardInPlay);


    // Notify the player that they can start their turn.
    io.to(firstPlayer.id).emit('turn start');
  }
}

/**
 * Notify players that a turn has been made, move to next player.
 */
function onCardPlayed(card, wildcardSuit = false) {
  let roomCode = this.player.roomCode;
  let deck = rooms[roomCode].deck;

  // Remove the card from the player's hand.
  this.player.removeCardFromHand(card, deck);

  // Notify all clients how many cards a player has.
  io.in(roomCode).emit('update hand count', this.player, this.player.hand.length);

  // Check if the player's hand is empty, if so lower score and deal out more
  // cards.
  if (this.player.checkHandEmpty()) {
    this.player.countdown--;

    // Check to see if the game is over.
    if (this.player.countdown === 0) {
      // Notify players that the game is over and who the winner is.
      io.in(roomCode).emit('game over', this.player);

      // Remove the game room.
      delete rooms[roomCode];
      // Stop here.
      return;
    }

    // Notify everyone that a player's countdown score is being updated.
    io.in(roomCode).emit('update countdown score', this.player);

    dealCardsToPlayer(this.player, this.player.countdown);
  }

  // If a wildcard was played, notify the players that the suit has changed.
  if (wildcardSuit) {
    // Create a wildcard that we set as the current card in play.
    let wildcard = {
      value: false,
      suit: wildcardSuit
    }

    // Notfiy all players that the suit has changed.
    io.in(roomCode).emit('message', `THE SUIT HAS CHANGED TO ${wildcardSuit.toUpperCase()}`);

    // Update the card in play to our wildcard choice.
    io.in(roomCode).emit('update card in play', wildcard);
  }
  else {
    // Update the card in play to the card that was last played.
    io.in(roomCode).emit('update card in play', card);
  }

  // Let everyone know that the player has played a card.
  this.broadcast.to(roomCode).emit('show card played', this.player, card);

  // If a king was played, we need to reverse the direction of play.
  if (card.value === 'k') {
    rooms[roomCode].reverseDirection = (rooms[roomCode].reverseDirection) ? false : true;

    // Tell the client that they have reversed the direction.
    this.emit('message', 'YOU REVERSED THE DIRECTION OF PLAY');

    // Notify everyone else who reversed the direction.
    this.broadcast.to(roomCode).emit('message', `${this.player.name} REVERSED THE DIRECTION PLAY`);
  }

  // If a jack was played skip the next players turn.
  if (card.value === 'j') {
    // Skip the next player, get the name of the skipped player.
    let skippedPlayer = rooms[roomCode].getNextPlayer();

    // Tell the client who's turn they skipped.
    this.emit('message', `YOU SKIPPED ${skippedPlayer.name}'S TURN`);

    // Notify player that their turn was skipped.
    io.to(skippedPlayer.id).emit('message', `${this.player.name} SKIPPED YOUR TURN`);
  }

  // Grab the next player to play.
  let player = rooms[roomCode].getNextPlayer();

  // If a queen of spades was played, deal 5 cards to the next player.
  if (card.name === 'q of spades') {
    io.to(player.id).emit('message', 'PICKUP 5 CARDS')
    dealCardsToPlayer(player, 5);
  }

  // If a 2 was played, deal two cards to the next player.
  if (card.value === '2') {
    io.to(player.id).emit('message', 'PICKUP 2 CARDS')
    dealCardsToPlayer(player, 2);
  }

  // Notify everyone who is going to play next.
  io.in(roomCode).emit('show player turn', player);

  // Notify the first player to start the turn.
  io.to(player.id).emit('turn start');
}

/**
 * Player has no playable cards, deal a new card and move on.
 */
function onDrawCard() {
  let roomCode = this.player.roomCode;

  // Deal a new card to the player.
  dealCardsToPlayer(this.player);

  // Let everyone know that the player has played a card.
  this.broadcast.to(roomCode).emit('show card draw', this.player);

  // Grab the next player to play.
  let player = rooms[roomCode].getNextPlayer();

  // Notify everyone who is going to play next.
  io.in(roomCode).emit('show player turn', player);

  // Notify the first player to start the turn.
  io.to(player.id).emit('turn start');
}

/**
 * Handle user disconnection, notify others who left.
 */
function onDisconnect() {
  // Check to see if the socket has a player data object.
  if ('player' in this) {
    let roomCode = this.player.roomCode;
    let players = getPlayersInRoom(roomCode);

    // Check to see if the room is empty.
    if (players.length > 0) {
      // Unready all the players.
      for (let player of players) {
        player.ready = false;
      }

      // Tell everyone the player has disconnected.
      io.in(roomCode).emit('player quit', this.player);

      // Put the player's hand back in the play pile so that cards go back into
      // circulation.
      let deck = rooms[roomCode].deck;

      for (let card of this.player.hand) {
        deck.addCardToPlayPile(card);
      }

      // Grab the player turn so we can check if player disconnected on their
      // turn.
      let playerTurn = rooms[roomCode].playerTurn;
      
      // If a player disconnected on their turn, move to the next player in
      // order.
      if (rooms[roomCode].playerOrder[playerTurn].id == this.id) {
        // Grab the next player to play.
        let player = rooms[roomCode].getNextPlayer();

        // Notify everyone who is now playing.
        io.in(roomCode).emit('show player turn', player);

        // Notify the player to start the turn.
        io.to(player.id).emit('turn start');
      }

      // Remove player from room's player order array.
      rooms[roomCode].removePlayerByID(this.id);
    }
    else {
      // If the room is empty, remove it from the map.
      delete rooms[roomCode];
    }
  }
}

/**
 * Check and return whether all players are ready to play.
 */
function checkAllPlayersReady(roomCode) {
  let ready = true;
  let players = getPlayersInRoom(roomCode);
  let sockets = getSocketsInRoom(roomCode);

  // Only continue if there is 2 or more players.
  if (players.length >= 2) {
    // See if any players are not ready.
    for (let player of players) {
      if (player.ready === false) {
        ready = false;
      }
    }
  }
  else {
    ready = false;
  }

  // Check to see if any players are still drawing their avatar by comparing
  // the number of sockets in the room vs. players in the room (a player object
  // isn't created until the GameScene, so this is pretty hacky).
  if (players.length !== sockets.length) {
    ready = false;
  }

  return ready;
}

/**
 * Shuffle player order using Fisher Yates implementation.
 */
function shufflePlayerOrder(roomCode) {
  let players = getPlayersInRoom(roomCode);

  for (let i = players.length - 1; i > 0; i--) {
    let randomIndex = Math.floor(Math.random() * (i + 1));
    let itemAtIndex = players[randomIndex];

    players[randomIndex] = players[i];
    players[i] = itemAtIndex;
  }

  return players;
}

/**
 * Return all sockets currently connected to a room.
 */
function getSocketsInRoom(roomCode) {
  let sockets = [];

  // Check to see if anyone is even in the room.
  if (io.sockets.adapter.rooms[roomCode] !== undefined) {
    // Loop over sockets connected to a room, return all players found.
    Object.keys(io.sockets.adapter.rooms[roomCode].sockets).forEach(socket => {
      sockets.push(socket);
    });
  }

  return sockets;
}

/**
 * Return all players currently connected to a room.
 */
function getPlayersInRoom(roomCode) {
  let players = [];

  // Check to see if anyone is even in the room.
  if (io.sockets.adapter.rooms[roomCode] !== undefined) {
    // Loop over sockets connected to a room, return all players found.
    Object.keys(io.sockets.adapter.rooms[roomCode].sockets).forEach(socket => {
      let player = io.sockets.connected[socket].player;

      if (player) {
        players.push(player);
      }
    });
  }

  return players;
}

/**
 * Deal a number of cards to a player.
 */
function dealCardsToPlayer(player, numberOfCards = 1) {
  // We want to keep track of how many cards are left to deal if the deck
  // needs to be shuffled.
  for (let cardsLeftToDeal = numberOfCards; cardsLeftToDeal >= 1; cardsLeftToDeal--) {
    let cardToDeal = rooms[player.roomCode].deck.drawPile.shift();

    if (cardToDeal) {
      // Move the card to player's hand array.
      player.addCardToHand(cardToDeal);

      // Send the card to the player's client.
      io.to(player.id).emit('add card to hand', cardToDeal);

      // Notify all clients how many cards a player has.
      io.in(player.roomCode).emit('update hand count', player, player.hand.length);
    }
    else {
      // No cards left to draw, shuffle and try again.
      rooms[player.roomCode].deck.shuffleDeck();

      // Notify the players that the deck is being shuffled.
      io.in(player.roomCode).emit('shuffle deck');

      // If there are no cards left in the draw pile, stop.
      if (rooms[player.roomCode].deck.drawPile.length === 0) {
        return;
      }
      else {
        // Retry dealing a card to the player.
        cardsLeftToDeal++;
      }
    }
  }
}
