export default class Game {
  players = {};

  constructor(socket) {
    this.socket = socket;

    this.addListeners();
    this.setupCanvas();
    this.start();
  }

  updateCanvasSize = () => {
    const canvas = document.getElementById('canvas');

    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;

    return canvas;
  };

  setupCanvas = () => {
    const canvas = this.updateCanvasSize();

    this.context = canvas.getContext('2d');
  };

  addListeners = () => {
    window.addEventListener('resize', this.updateCanvasSize);
  };

  renderGame = () => {
    this.context.clearRect(0, 0, window.innerWidth, window.innerHeight);

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
    this.socket.on('update-player', (payload) => {
      this.players[payload.socketId] = payload.player;
    });

    this.socket.on('delete-player', (socketId) => {
      delete this.players[socketId];
    });

    requestAnimationFrame(this.renderGame);
  };
}
