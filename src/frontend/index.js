import Game from './src/Game.js';

const socket = io();

new Game(socket);
