const express = require('express');
const http = require('http');
const cors = require('cors');
const { Server } = require('socket.io');
const { ExpressPeerServer } = require('peer');
const crypto = require('crypto');

const app = express();
app.use(cors());

const server = http.createServer(app);
const io = new Server(server, {
  cors: { origin: "*", methods: ["GET", "POST"] }
});

// Vos IDs autorisés (Le premier est le vôtre, l'admin)
let AUTHORIZED_AGENTS = {
  "KARIM-ADMIN": "Agent Karim (Admin)"
};

const users = new Map();

const peerServer = ExpressPeerServer(server, {
  debug: true,
  path: '/mibaudiovideo'
});

app.use('/peerjs', peerServer);

io.on('connection', (socket) => {
  // Tentative de connexion (Auto via lien ou Manuel)
  socket.on('join_room', (data) => {
    const agentName = AUTHORIZED_AGENTS[data.agentId];
    if (agentName) {
      socket.join(data.room);
      // On stocke aussi le peerId s'il est envoyé
      users.set(socket.id, { 
        username: agentName, 
        agentId: data.agentId, 
        peerId: data.peerId 
      });
      socket.emit('auth_success', { username: agentName, isAdmin: data.agentId === "KARIM-ADMIN" });
      
      const roomUsers = Array.from(users.values());
      io.to(data.room).emit('update_user_list', roomUsers);
    } else {
      socket.emit('auth_error', { message: "ID Agent invalide." });
    }
  });

  // Mise à jour du PeerID quand PeerJS est prêt
  socket.on('update_peer_id', (data) => {
    const user = users.get(socket.id);
    if (user) {
      user.peerId = data.peerId;
      io.emit('update_user_list', Array.from(users.values()));
    }
  });

  // Action Admin : Créer une invitation
  socket.on('create_invite', (data) => {
    // Vérifier si c'est bien l'admin
    const user = users.get(socket.id);
    if (user && user.agentId === "KARIM-ADMIN") {
      const newId = crypto.randomBytes(4).toString('hex').toUpperCase();
      AUTHORIZED_AGENTS[newId] = data.name;
      socket.emit('invite_created', { id: newId, name: data.name });
    }
  });

  socket.on('send_message', (data) => {
    socket.to(data.room).emit('receive_message', data);
  });

  socket.on('disconnect', () => {
    const user = users.get(socket.id);
    if (user) {
      users.delete(socket.id);
      io.emit('update_user_list', Array.from(users.values()));
    }
  });
});

const PORT = process.env.PORT || 3001;
server.listen(PORT, () => {
  console.log(`M.I.B Secure Server running on port ${PORT}`);
});
