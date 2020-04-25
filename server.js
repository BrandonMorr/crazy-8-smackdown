import Http from 'http';
import Path from 'path';
import Helmet from 'helmet';
import Crypto from 'crypto';
import Express from 'express';
import SocketIO from 'socket.io';
import Compression from 'compression';

// Array to track active rooms.
var rooms = [];

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
    socket.on('disconnect', onDisconnect);
  });
}

/**
 * Callback to handle creating a new game.
 */
function onNewGame() {
  // Generate a random token to be used as room code.
  Crypto.randomBytes(2, (err, buf) => {
    var roomCode = buf.toString('hex');

    // Connect the user to the room.
    this.join(roomCode);

    // Add room to list of active rooms.
    rooms.push(roomCode);

    // Send the room code back to the client.
    this.emit('room code', roomCode);

    console.log('[' + this.id + '] created room: ' + roomCode);
  });
}

/**
 * Callback to handle joining an existing game.
 */
function onJoinGame(roomCode) {
  // Check to see if the supplied room code is actively in  use.
  var foundRoom = rooms.find(room => room === roomCode);

  // If room code is valid, connect the user.
  if (foundRoom) {
    // Connect the user to the room.
    this.join(roomCode);

    // Send the room code back to the client.
    this.emit('room code', roomCode);

    console.log('[' + this.id + '] joined room: ' + roomCode);
  }
  else {
    // TODO: emit some sort of error message back to the client.
    // something like...
    // this.emit('error room does not exist', roomCode);
  }
}

/**
 * Callback to notify other players that a new player has connected.
 *
 * Send the client back a list of existing players in the room.
 */
function onNewPlayer(playerName, roomCode) {
  this.player = {
    name: playerName,
    roomCode: roomCode,
    ready: false
  }

  // Build up a list of all current players, send the data to the client.
  this.emit('get players', getPlayersInRoom(roomCode));

  // Broadcast new player to other new players.
  this.broadcast.to(roomCode).emit('new player', this.player);
}

/**
 * Callback to notify players that a player is ready to smack down.
 *
 * Check to see if all players are ready and if so notify everyone that the
 * game has begun.
 */
function onPlayerReady(playerName, roomCode) {
  this.player.ready = true;

  // Let everyone else know you're ready.
  this.broadcast.to(this.player.roomCode).emit('player ready', this.player.name);

  // Check to see if all players are ready.
  if (checkAllPlayersReady(this.player.roomCode)) {
    // TODO: should store some sort of gameStarted property on the room
    // server-side so we can prevent any people from joining.
    io.to(this.player.roomCode).emit('game start');
  }
}

/**
 * Callback function to handle when a user disconnects.
 *
 * Check to see if clients current room is empty, if so remove it from the list
 * of active rooms.
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
  var players = getPlayersInRoom(roomCode);

  // Only continue if there is 2 or more players.
  if (players.length >= 2) {
    // See if any players are not ready.
    if (players.find(player => player.ready === false)) {
      return false;
    }
    else {
      return true;
    }
  }
  else {
    return false;
  }
}

/**
 * Return all other players currently connected to a room.
 */
function getPlayersInRoom(roomCode) {
  var players = [];

  Object.keys(io.sockets.adapter.rooms[roomCode].sockets).forEach(id => {
    var player = io.sockets.connected[id].player;

    if (player) {
      players.push(player);
    }
  });

  return players;
}
