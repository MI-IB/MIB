const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: {
    origin: "*", 
    methods: ["GET", "POST"]
  }
});

const users = new Map();

const AUTHORIZED_AGENTS = {
  "ALPHA-01": "Agent Karim",
  "BETA-02": "Agent Contact 1",
  "GHOST-00": "Agent Invité"
};

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/mibaudiovideo'
});

app.use('/peerjs', peerServer);

io.on('connection', (socket) => {
  socket.on('join_room', (data) => {
    const agentName = AUTHORIZED_AGENTS[data.agentId];
    if (agentName) {
      socket.join(data.room);
      users.set(socket.id, agentName);
      socket.emit('auth_success', { username: agentName });
    } else {
      socket.emit('auth_error', { message: "ID Agent invalide." });
    }
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`M.I.B Server running on port ${PORT}`);
});
