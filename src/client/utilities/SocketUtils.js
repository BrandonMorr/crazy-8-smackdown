/**
 * @class - SocketUtils static class to provide SocketIO utilities.
 */
export default class SocketUtils {

  static getPlayerNamesFromRoomCode(socket, roomCode) {
    var players = [];

    Object.keys(socket.sockets.adapter.rooms[roomCode].sockets).forEach(function(id) {
      var player = socket.sockets.connected[id].name;

      if (player) {
        players.push(player);
      }
    });

    return players;
  }
}
