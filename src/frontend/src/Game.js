import Player from './Player.js';

class Canvas {
  constructor() {
    this.canvas = document.getElementById('canvas');

    this.width = 200;
    this.height = 200;

    this.updateCanvasSize()
    this.addListeners();
  }

  updateCanvasSize = () => {
    this.canvas.width = this.width;
    this.canvas.height = this.height;
  }

  getContext = () => {
    return this.canvas.getContext('2d');
  }

  addListeners = () => {
    window.addEventListener('resize', this.updateCanvasSize);
  };
}

export default class Game {
  players = {}

  constructor(socket) {
    this.socket = socket;
    this.canvas = new Canvas();
    this.context = this.canvas.getContext();

    this.start();
  }

  renderGame = () => {
    this.context.clearRect(0, 0, 200, 200);

    for (let id in this.players) {
      const player = this.players[id];

      this.context.fillStyle = player.color;
      this.context.beginPath();
      this.context.arc(player.coords.x, player.coords.y, 20, 0, 2 * Math.PI);
      this.context.fill();
    }

    requestAnimationFrame(this.renderGame);
  };

  start = () => {
    this.player = new Player(this.socket, this.players, this.context);

    this.socket.on('update-all-players', (players) => {
      this.players = players;
      this.player.players = players
    })

    this.socket.on('update-player', (payload) => {
      this.players[payload.socketId] = payload.player;
    });

    this.socket.on('delete-player', (socketId) => {
      delete this.players[socketId];
    });

    requestAnimationFrame(this.renderGame);
  };
}
