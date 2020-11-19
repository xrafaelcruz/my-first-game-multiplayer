
class SocketEvents {
  players = {};

  newPlayer = (socket) => () => {
    const newPlayer = {
      coords: { x: 10, y: 40 }
    };

    this.players[socket.id] = newPlayer
  }

  movement = (socket) => (movement) => {
    const player = this.players[socket.id] || {};

    if (movement.left) player.coords.x -= 5;
    if (movement.up) player.coords.y -= 5;
    if (movement.right) player.coords.x += 5;
    if (movement.down) player.coords.y += 5;
  }

  disconnect = (socket) => () => {
    delete this.players[socket.id];
  }

  connection = (socket) => {
    socket.on('new player', this.newPlayer(socket));
    socket.on('movement', this.movement(socket));
    socket.on('disconnect', this.disconnect(socket));
  }

  syncPlayers = (io) => {
    setInterval(() => {
      io.sockets.emit('players', this.players);
    }, 1000 / 60);
  }

  init = (io) => {
    io.on('connection', this.connection);
    this.syncPlayers(io);
  }
}

module.exports = new SocketEvents().init;
