const express = require('express');
const enableWs = require('express-ws');
const app = express();
const wsDispatcher = require('./wsDispatcher');

const wss = enableWs(app);

app.get('/', function (req, res) {
  res.send('Hello World!');
});

app.ws('/chat', wsDispatcher.bind(undefined, wss.getWss().clients));

app.listen(3000, function () {
  console.log('Example app listening on port 3000!');
});


