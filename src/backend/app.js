const express = require('express');
const http = require('http');
const socketIO = require('socket.io');
const path = require('path');

const routes = require('./routes');
const socketEvents = require('./socketEvents');

class App {
  constructor() {
    this.express = express();
    this.server = http.Server(this.express);
    this.io = socketIO(this.server);

    socketEvents(this.io);
    this.routes();
  }

  routes() {
    this.express.use(
      '/frontend',
      express.static(path.join(__dirname, '..', 'frontend'))
    );

    this.express.use(routes);
  }
}

module.exports = new App().server;
