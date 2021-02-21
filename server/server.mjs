import http from 'http';
import {Server} from 'socket.io';

const PORT = 3000;
const server = http.createServer();
let options = {
  cors: {origin: "http://localhost:8080"}
};
const io = new Server(server, options);

io.on('connection', (socket) => {
  console.log(`Web socket connected -- ${socket.id}`);
  socket.on('message', (message) => {
    console.log(message);

    io.emit('message', message);
  })
});

server.listen(PORT, () => {
  console.log(`Server listening on port ${PORT}`);
});