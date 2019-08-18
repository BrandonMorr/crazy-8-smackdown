import SocketIO from 'socket.io-client';
import Compression from 'compression';
import Express from 'express';
import Helmet from 'helmet';
import Path from 'path';
import Http from 'http';

// Server setup.
const app = Express();
const server = Http.Server(app);
const io = SocketIO(server);
const port = process.env.PORT || 3000;

// Fire up Helmet and Compression for better Express security and performance.
app.use(Helmet());
app.use(Compression());

// Add static file middleware + express request route.
app.use('/public', Express.static(__dirname));
app.get('/', function(request, response) {
   response.sendFile(Path.resolve(__dirname, 'index.html'));
})

// Confirmation that the server init went well.
server.listen(port, () => {
  console.log('🕺 Server init complete, listening for connections on port ' + port + ' 🕺\n');
});

// Notify when clients connect/disconnect.
io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('disconnect', (socket) => {
      console.log('User disconnected');
    });
});
