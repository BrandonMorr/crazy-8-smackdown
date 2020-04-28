import Http from 'http';
import Path from 'path';
import Helmet from 'helmet';
import Crypto from 'crypto';
import Express from 'express';
import SocketIO from 'socket.io';
import Compression from 'compression';

import Deck from './objects/Deck';
import Card from './objects/Card';
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
app.use('/public', Express.static(Path.join(__dirname, '../')));

// Request router.
app.get('/', function(request, response) {
   response.sendFile(Path.join(__dirname, '../index.html'));
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
    socket.on('join game', onJoinGame);
    socket.on('new player', onNewPlayer);
    socket.on('player ready', onPlayerReady);
    socket.on('card played', onCardPlayed);
    socket.on('disconnect', onDisconnect);
  });
}

/**
 * Handle creating a new game.
 */
function onNewGame() {
  // Generate a random token to be used as room code.
  Crypto.randomBytes(2, (err, buf) => {
    let room = {
      roomCode: buf.toString('hex'),
      gameStarted: false,
      gameOver: false,
      playerOrder: [],
      playerTurn: 0,
    };

    // Connect the user to the room.
    this.join(room.roomCode);

    // Send the room code back to the client.
    this.emit('room code', room.roomCode);

    // Add room to list of active rooms.
    rooms[room.roomCode] = room;
  });
}

/**
 * Handle joining an existing game.
 */
function onJoinGame(roomCode) {
  // Check to see if the supplied room code is actively in use.
  let foundRoom = Object.keys(rooms).find(room => room === roomCode);

  // If room code is valid and the game hasn't started, connect the user.
  if (foundRoom) {
    if (rooms[foundRoom].gameStarted === false) {
      // Connect the user to the room.
      this.join(roomCode);

      // Send the room code back to the client.
      this.emit('room code', roomCode);
    }
    else {
      // TODO: emit some sort of error message back to the client.
      // something like...
      // this.emit('error game in progress');
    }
  }
  else {
    // TODO: emit some sort of error message back to the client.
    // something like...
    // this.emit('error room does not exist');
  }
}

/**
 * Notify others that a new player has connected.
 *
 * Send the client back a list of existing players in the room.
 */
function onNewPlayer(playerName, roomCode) {
  this.player = new Player(playerName, roomCode);

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
function onPlayerReady(playerName) {
  this.player.ready = true;

  // Let everyone else know the player is ready.
  this.broadcast.to(this.player.roomCode).emit('show player ready', this.player.name);

  // Check to see if all players are ready.
  if (checkAllPlayersReady(this.player.roomCode)) {
    // Flag that the room's game has started.
    rooms[this.player.roomCode].gameStarted = true;

    // Notify everyone that the game has started.
    io.to(this.player.roomCode).emit('game started');

    // Determine the player order.
    rooms[this.player.roomCode].playerOrder = shufflePlayerOrder(this.player.roomCode);

    // Generate a deck object, store it in the room data.
    rooms[this.player.roomCode].deck = new Deck();

    // Deal out 8 cards to players.
    for (let i = 0; i <= 7; i++) {
      for (let player of rooms[this.player.roomCode].playerOrder) {
        dealCardsToPlayer(player);
      }
    }

    // Shift out a card from the draw pile...
    let cardToDeal = rooms[this.player.roomCode].deck.drawPile.shift();

    // ...and place said card on the top of the play pile.
    rooms[this.player.roomCode].deck.playPile.unshift(cardToDeal);

    // Set the first card in play pile as the last card played.
    rooms[this.player.roomCode].currentCardInPlay = cardToDeal;

    // Set the suit in play pile as the last card's suit.
    rooms[this.player.roomCode].currentSuitInPlay = cardToDeal.suit;

    // Notify all players who's turn it is.
    io.to(this.player.roomCode).emit('show player turn', rooms[this.player.roomCode].playerOrder[0]);
  }
}

/**
 * Notify players that a turn has been made, move to next player.
 */
function onCardPlayed() {
  let roomCode = this.player.roomCode;
  let playerTurn = rooms[roomCode].playerOrder.length - 1;

  // Let everyone know that the player has played a card.
  this.broadcast.to(roomCode).emit('show card played', this.player);

  // If the last player has played, reset back to first player. Otherwise
  // move to the next player.
  rooms[roomCode].playerTurn === playerTurn ? rooms[roomCode].playerTurn = 0 : rooms[roomCode].playerTurn++;

  // Grab the next player to play.
  let player = rooms[roomCode].playerOrder[rooms[roomCode].playerTurn];

  // Notify everyone who is going to play next.
  io.to(roomCode).emit('show player turn', player);
}

/**
 * Handle user disconnection, notify others who left.
 *
 * TODO: handle reomving the player from the playerOrder property in the rooms
 * array.
 */
function onDisconnect() {
  // Check to see if the socket has a player data object.
  if ('player' in this) {
    // Alert others of the disconnected player.
    io.to(this.player.roomCode).emit('player quit', this.player.name);
  }

  console.log('[' + this.id + '] has disconnected');
}

/**
 * Check and return whether all players are ready to play.
 */
function checkAllPlayersReady(roomCode) {
  let players = getPlayersInRoom(roomCode);

  // Only continue if there is 2 or more players.
  if (players.length >= 2) {
    // See if any players are not ready.
    for (let player of players) {
      if (player.ready === false) {
        return false;
      }
      else {
        return true;
      }
    }
  }
  else {
    return false;
  }
}

/**
 * Determine if the game is over by checking each player's countdown score, 0
 * is considered game over.
 */
function checkGameOver(roomCode) {
  let players = getPlayersInRoom(roomCode);

  for (let player of players) {
    // If the player's countdown is at 0 then game over.
    if (player.countdown === 0) {
      rooms[roomCode].gameOver = true;
      // TODO: set the player to winner, do some cool visual shite.
    }
  }
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
 * Return all players currently connected to a room.
 */
function getPlayersInRoom(roomCode) {
  let players = [];

  // Loop over sockets connected to a room, return all players found.
  Object.keys(io.sockets.adapter.rooms[roomCode].sockets).forEach(socket => {
    let player = io.sockets.connected[socket].player;

    if (player) {
      players.push(player);
    }
  });

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
    }
    else {
      // No cards left to draw, shuffle and try again.
      rooms[player.roomCode].deck.shuffleDeck();

      // If there are enough cards left to deal, deal em'.
      if (rooms[player.roomCode].deck.drawPile >= cardsLeftToDeal) {
        // Make sure to only deal the remainder (if there is enough).
        dealCardsToPlayer(player, cardsLeftToDeal);
      }
      else {
        console.log('No more cards left to deal! Wtf?');
      }
    }
  }
}
