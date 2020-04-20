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
  console.log('\n> server init complete, listening for connections on port ' + port + ' 🕺\n');

  // Start listening for events from client.
  setServerHandlers();
});

/**
 * Setup server event handlers.
 */
function setServerHandlers() {
  io.on('connection', (socket) => {
    console.log('> player has connected (id: ' + socket.id + ')');

    socket.on('new game', onNewGame);

    socket.on('join game', onJoinGame);

    socket.on('deal cards', () => {
      io.emit('dealCards');
    });

    socket.on('card played', (gameObject) => {
        io.emit('cardPlayed', gameObject);
    });

    socket.on('disconnect', onClientDisconnect);
  });
}

/**
 * Callback function to handle a new game.
 *
 * TODO: Implement some sort of error handling.
 */
function onNewGame() {
  // Generate a random token to be used as room code.
  Crypto.randomBytes(2, (err, buf) => {
    var roomCode = buf.toString('hex');

    // Connect the user to the room.
    this.join(roomCode);

    // Add room to list of active rooms.
    rooms.push(roomCode);

    // Log it to the server.
    console.log('> ' + this.name + ' (id: ' + this.id + ')' + ' created room: ' + roomCode);
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
    this.join(roomCode);

    console.log('> ' + playerName + ' (id: ' + this.id + ')' + ' joined room: ' + roomCode);
  }
  else {
    // Err: room does not exist.
  }
}

/**
 * Callback function to handle when a user disconnects.
 *
 * Check to see if clients current room is empty, if so remove it from the list
 * of active rooms.
 */
function onClientDisconnect() {
  console.log('> player has disconnected (id: ' + this.id + ')');
}

/**
 * Print out all players currently connected to a room.
 */
function getAllPlayersFromRoom(roomCode) {
  var players = [];

  Object.keys(io.sockets.adapter.rooms[roomCode].sockets).forEach(function(socketId) {
    var player = io.sockets.connected[socketId].name;

    if (player) {
      players.push(player);
    }
  });

  console.log(players);
}
