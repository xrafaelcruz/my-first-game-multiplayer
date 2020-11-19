const canvasWidth = 200
const canvasHeight = 300

export default class Game {
  constructor(socket) {
    this.socket = socket;

    this.setupCanvas()
    this.render();
  }

  setupCanvas = () => {
    const canvas = document.getElementById('canvas');
    canvas.width = canvasWidth;
    canvas.height = canvasHeight;

    this.context = canvas.getContext('2d');
  }

  render = () => {
    this.socket.on('players', (players) => {
      this.context.clearRect(0, 0, canvasWidth, canvasHeight);
      this.context.fillStyle = 'green';

      for (let id in players) {
        const player = players[id];
        
        this.context.beginPath();
        this.context.arc(player.coords.x, player.coords.y, 10, 0, 2 * Math.PI);
        this.context.fill();
      }
    });
  }
}