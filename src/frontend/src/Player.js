
export default class Player {
  constructor(socket) {
    this.socket = socket;
    this.movement = { up: false, down: false, left: false, right: false };

    this.socket.emit('new player');

    this.addListeners();
    this.syncMovements();
  }

  addListeners = () => {
    document.addEventListener('keydown', (event) => {
      switch (event.keyCode) {
        case 65: // A
          this.movement.left = true;
          break;
        case 87: // W
          this.movement.up = true;
          break;
        case 68: // D
          this.movement.right = true;
          break;
        case 83: // S
          this.movement.down = true;
          break;
      }
    });
    
    document.addEventListener('keyup', (event) => {
      switch (event.keyCode) {
        case 65: // A
          this.movement.left = false;
          break;
        case 87: // W
          this.movement.up = false;
          break;
        case 68: // D
          this.movement.right = false;
          break;
        case 83: // S
          this.movement.down = false;
          break;
      }
    });
  }

  syncMovements = () => {
    setInterval(() => {
      this.socket.emit('movement', this.movement);
    }, 1000 / 60);
  }
}
