class SocketEvents {
  players = {};

  newPlayer = (socket, io) => () => {
    const player = {
      coords: { x: 10, y: 40 },
    };

    this.players[socket.id] = player;

    // preciso mandar todos os players para o front, e atualizar os players
    // do front com esses novos players

    socket.broadcast.emit('player-update', {
      socketId: socket.id,
      player,
    });

    socket.broadcast.emit('hello', 'world');
  };

  movement = (socket, io) => (direction) => {
    const player = this.players[socket.id] || {}; // ver isso

    if (direction.left) player.coords.x -= 5;
    if (direction.up) player.coords.y -= 5;
    if (direction.right) player.coords.x += 5;
    if (direction.down) player.coords.y += 5;

    socket.broadcast.emit('player-update', {
      socketId: socket.id,
      player,
    });
  };

  disconnect = (socket, io) => () => {
    delete this.players[socket.id];
    socket.broadcast.emit('player-remove', socket.id);
  };

  connection = (io) => (socket) => {
    socket.on('new player', this.newPlayer(socket, io));
    socket.on('movement', this.movement(socket, io));
    socket.on('disconnect', this.disconnect(socket, io));
  };

  init = (io) => {
    io.on('connection', this.connection(io));
  };
}

module.exports = new SocketEvents().init;
