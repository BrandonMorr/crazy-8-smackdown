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
 * Callback function to handle a new game.
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
    io.emit('room code', roomCode);

    console.log('[' + this.id + '] created room: ' + roomCode);
  });
}

/**
 * Callback function to handle joining an existing game.
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
    // Err: room does not exist.
  }
}

/**
 * Notify other players that a new player has connected.
 */
function onNewPlayer(playerName, roomCode) {
  this.name = playerName;
  this.roomCode = roomCode;

  // Build up a list of all current players, send the data to the client.
  this.emit('get players', getPlayersInRoom(this.name, roomCode));

  // Broadcast new player to other new players.
  this.broadcast.to(roomCode).emit('new player', playerName);
}

/**
 *
 */
function onPlayerReady(playerName, roomCode) {
  // Let everyone else know you're ready.
  this.broadcast.to(roomCode).emit('player ready', playerName);
}

/**
 * Callback function to handle when a user disconnects.
 *
 * Check to see if clients current room is empty, if so remove it from the list
 * of active rooms.
 */
function onDisconnect() {
  if (this.roomCode) {
    io.to(this.roomCode).emit('player quit', this.name);
  }
  console.log('[' + this.id + '] has disconnected');
}

/**
 * Return all other players currently connected to a room.
 */
function getPlayersInRoom(playerName, roomCode) {
  var players = [];

  Object.keys(io.sockets.adapter.rooms[roomCode].sockets).forEach(function(id) {
    var player = io.sockets.connected[id].name;

    if (player) {
      players.push(player);
    }
  });

  return players;
}
