import Http from 'http';
import Path from 'path';
import Helmet from 'helmet';
import Express from 'express';
import SocketIO from 'socket.io';
import Compression from 'compression';

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
  console.log('\n==> Server init complete, listening for connections on port ' + port + ' 🕺\n');

  var rooms = [];
  var players = [];

  // Start listening for events from client.
  setServerHandlers();
});

/**
 * Setup server event handlers.
 */
function setServerHandlers() {
  io.on('connection', (socket) => {
    console.log('==> Player has connected (ID: ' + socket.id + ')');
    // Listen for new player events.
    socket.on('new player', onNewPlayer);
    // Listen for disconnect events.
    socket.on('disconnect', onClientDisconnect);
    // Build up a list of all current players, send the data to the client.
    // io.to(socket.roomCode).emit('displayallplayers', getAllPlayers());
    // Broadcast new player to other new players
    // socket.broadcast.emit('new player', socket.player);
  });
}

/**
 * Callback function to handle a new player.
 *
 * @param {Object} playerData - Object representing the player information.
 */
function onNewPlayer(playerData) {
  this.player = {
    id: player.socket.id,
    name: player.name,
    roomCode: player.roomCode
  };
  this.join(room);

  console.log('Player ' + this.player.name + ' connected to room ' + this.room);

  players.push(this.player);
}

/**
 * Callback function to handle when a user disconnects.
 */
function onClientDisconnect() {
  console.log('==> Player has disconnected (ID: ' + this.id + ')');
}

/**
 * Return all players currently connected a given room.
 */
function getAllPlayersFromRoom(room) {
  var players = [];

  Object.keys(io.sockets.adapter.rooms[room].sockets).forEach(function(socketId) {
    var player = io.sockets.connected[socketId].id;

    if (player) {
      players.push(player);
    }
  });

  return players;
}
