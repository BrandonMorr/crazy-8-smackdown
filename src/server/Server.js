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

// Confirmation that the server init went well.
server.listen(port, () => {
  console.log('\n🕺 Server init complete, listening for connections on port ' + port + ' 🕺\n');
});

// Notify when clients connect/disconnect.
io.on('connection', (socket) => {
    console.log("User connected");

    socket.on('disconnect', (socket) => {
      console.log('User disconnected');
    });
});
