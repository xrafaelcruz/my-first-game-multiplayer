var path = require('path');

const { Router } = require('express');

const routes = new Router();

routes.get('/', function(request, response) {
  response.sendFile(path.join(__dirname, '..', 'frontend', 'index.html'));
});

module.exports = routes;
