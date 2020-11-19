import Game from './src/Game.js'
import Player from './src/Player.js'

const socket = io();

new Player(socket);
new Game(socket);