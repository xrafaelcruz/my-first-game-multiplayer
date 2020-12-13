export default class Player {
  constructor(socket, players) {
    this.players = players
    this.socket = socket;
    this.directions = { up: false, down: false, left: false, right: false };

    this.socket.emit('new-player');

    this.addListeners();
  }

  addListeners = () => {
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 65: // A
          this.directions.left = true;
          break;
        case 87: // W
          this.directions.up = true;
          break;
        case 68: // D
          this.directions.right = true;
          break;
        case 83: // S
          this.directions.down = true;
          break;
      }

      this.socket.emit('move', this.directions);
    });

    document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 65: // A
          this.directions.left = false;
          break;
        case 87: // W
          this.directions.up = false;
          break;
        case 68: // D
          this.directions.right = false;
          break;
        case 83: // S
          this.directions.down = false;
          break;
      }

      this.socket.emit('move', this.directions);
    });
  };
}
