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

// Stockage simple des utilisateurs en mémoire
const users = new Map();

// Liste des IDs autorisés
const AUTHORIZED_AGENTS = {
  "ALPHA-01": "Agent Karim",
  "BETA-02": "Agent Contact 1",
  "GHOST-00": "Agent Invité"
};

// Serveur PeerJS pour le WebRTC
const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/mibaudiovideo'
});

app.use('/peerjs', peerServer);

io.on('connection', (socket) => {
  console.log(`User connected: ${socket.id}`);

  socket.on('join_room', (data) => {
    const agentName = AUTHORIZED_AGENTS[data.agentId];
    if (agentName) {
      socket.join(data.room);
      users.set(socket.id, { username: agentName, agentId: data.agentId });
      socket.emit('auth_success', { username: agentName });
      
      // Envoyer la liste mise à jour à tout le monde
      const roomUsers = Array.from(users.values());
      io.emit('update_user_list', roomUsers);
      
      console.log(`User ${agentName} joined room: ${data.room}`);
    } else {
      socket.emit('auth_error', { message: "ID Agent invalide." });
    }
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      // Mettre à jour la liste pour les autres
      const roomUsers = Array.from(users.values());
      io.emit('update_user_list', roomUsers);
      console.log('User Disconnected', socket.id);
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`M.I.B Server running on port ${PORT}`);
});
