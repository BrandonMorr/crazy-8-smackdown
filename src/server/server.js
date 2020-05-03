import Http from 'http';
import Path from 'path';
import Helmet from 'helmet';
import Crypto from 'crypto';
import Express from 'express';
import SocketIO from 'socket.io';
import Compression from 'compression';

import Room from './objects/Room';
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
    let playersInRoom = getPlayersInRoom(roomCode).length;

    // If there are less than 4 players in the room, connect the user.
    if (playersInRoom < 4) {
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
function onNewPlayer(playerName, roomCode) {
  this.player = new Player(this.id, playerName, roomCode);

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

    // Notify everyone that the game has started.
    io.to(roomCode).emit('game started');

    // Determine the player order.
    rooms[roomCode].playerOrder = shufflePlayerOrder(roomCode);

    let firstPlayer = rooms[roomCode].playerOrder[0];

    // Notify all players who's turn it is.
    io.to(roomCode).emit('show player turn', firstPlayer);

    // Generate a deck object, store it in the room data.
    rooms[roomCode].deck = new Deck();

    // TODO: do this after the cards are dealt
    // Shift out a card from the draw pile...
    let firstCardInPlay = rooms[roomCode].deck.drawPile.shift();

    // Notify all players that there is a card in play.
    io.to(roomCode).emit('update card in play', firstCardInPlay);

    // ...and place said card on the top of the play pile.
    rooms[roomCode].deck.playPile.unshift(firstCardInPlay);

    // Set the first card in play pile as the last card played.
    rooms[roomCode].cardInPlay = firstCardInPlay;

    // Notify all players what the first card to play is.
    io.to(roomCode).emit('show first card in play', firstCardInPlay);

    // Deal out 8 cards to players.
    for (let i = 0; i <= 7; i++) {
      for (let player of rooms[roomCode].playerOrder) {
        dealCardsToPlayer(player);
      }
    }

    // Notify the player that they can start their turn.
    io.to(firstPlayer.id).emit('turn start');
  }
}

/**
 * Notify players that a turn has been made, move to next player.
 */
function onCardPlayed(card) {
  let roomCode = this.player.roomCode;
  let deck = rooms[roomCode].deck;
  let playerTurnLast = rooms[roomCode].playerOrder.length - 1;

  // Remove the card from the player's hand.
  this.player.removeCardFromHand(card, deck);

  // Check if the player's hand is empty, if so lower score and deal out more
  // cards.
  if (this.player.checkHandEmpty()) {
    this.player.countdown--;

    // Notify everyone that a player's countdown score is being updated.
    io.to(roomCode).emit('update countdown score', this.player);

    // Check to see if the game is over.
    if (this.player.countdown === 0) {
      // Notify players that the game is over and who the winner is.
      this.emit('game over', this.player);
    }

    dealCardsToPlayer(this.player, this.player.countdown);
  }

  // Update the card in play.
  rooms[this.player.roomCode].cardInPlay = card;

  // Notify all players that there is a card in play change.
  io.to(roomCode).emit('update card in play', card);

  // Let everyone know that the player has played a card.
  this.broadcast.to(roomCode).emit('show card played', this.player, card);

  // If the player in last position has played, reset back to first player.
  // Otherwise move position to next player.
  rooms[roomCode].playerTurn === playerTurnLast ? rooms[roomCode].playerTurn = 0 : rooms[roomCode].playerTurn++;

  // If a jack was played skip the next players turn.
  if (card.value === 'j') {
    let skippedPlayer = rooms[roomCode].playerOrder[rooms[roomCode].playerTurn];

    // Notify player that their turn was skipped.
    io.to(skippedPlayer.id).emit('message', 'SKIPPED YOUR TURN');

    rooms[roomCode].playerTurn === playerTurnLast ? rooms[roomCode].playerTurn = 0 : rooms[roomCode].playerTurn++;
  }

  // Grab the next player to play.
  let player = rooms[roomCode].playerOrder[rooms[roomCode].playerTurn];

  // If a 2 was played, deal two cards to the next player.
  if (card.value === '2') {
    io.to(player.id).emit('message', 'PICKUP 2 CARDS')
    dealCardsToPlayer(player, 2);
  }

  // If a queen of spades was played, deal 5 cards to the next player.
  if (card.name === 'q of spades') {
    io.to(player.id).emit('message', 'PICKUP 5 CARDS')
    dealCardsToPlayer(player, 5);
  }

  // Notify everyone who is going to play next.
  io.to(roomCode).emit('show player turn', player);

  // Notify the first player to start the turn.
  io.to(player.id).emit('turn start');
}

/**
 * Player has no playable cards, deal a new card and move on.
 */
function onDrawCard() {
  let roomCode = this.player.roomCode;
  let playerTurnLast = rooms[roomCode].playerOrder.length - 1;

  // Deal a new card to the player.
  dealCardsToPlayer(this.player);

  // Let everyone know that the player has played a card.
  this.broadcast.to(roomCode).emit('show card draw', this.player);

  // If the player in last position has played, reset back to first player.
  // Otherwise move position to next player.
  rooms[roomCode].playerTurn === playerTurnLast ? rooms[roomCode].playerTurn = 0 : rooms[roomCode].playerTurn++;

  // Grab the next player to play.
  let player = rooms[roomCode].playerOrder[rooms[roomCode].playerTurn];

  // Notify everyone who is going to play next.
  io.to(roomCode).emit('show player turn', player);

  // Notify the first player to start the turn.
  io.to(player.id).emit('turn start');
}

/**
 * Handle user disconnection, notify others who left.
 *
 * TODO:
 *  - handle reomving the player from the playerOrder property in the rooms
 *  array.
 */
function onDisconnect() {
  // Check to see if the socket has a player data object.
  if ('player' in this) {
    let roomCode = this.player.roomCode;
    let players = getPlayersInRoom(roomCode);

    // Check to see if the room is empty.
    if (players.length > 0) {
      // Alert others of the disconnected player.
      io.to(roomCode).emit('player quit', this.player);

      // Unready all the players.
      for (let player of players) {
        player.ready = false;
      }
    }
    else {
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
