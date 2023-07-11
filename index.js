const express = require('express');
const app = express();
const http = require('http');
const server = http.createServer(app);
const { Server } = require("socket.io");
const io = new Server(server);

app.get('/', (req, res) => {
  res.sendFile(__dirname + '/public/index.html');
});


app.use(express.static(__dirname +'/public'))

io.on('connection', (socket) => {
  console.log('a user connected');
  socket.on('message', (msg) => {
    socket.broadcast.emit('message', msg);
  });
});

server.listen(3000, () => {
  console.log('listening on *:3000');
});