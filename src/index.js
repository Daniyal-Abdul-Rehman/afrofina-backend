const mongoose = require('mongoose');
const app = require('./app');
const config = require('./config/config');
const logger = require('./config/logger');
const http = require('http'); // Import the http module
// const { Server } = require('socket.io'); // Import the Server class from socket.io

// Create HTTP server and pass in the Express app
const server = http.createServer(app);

// Create a new instance of Socket.IO server
// const io = new Server(server, {
//   cors: {
//     origin: '*',
//     methods: ['GET', 'POST'],
//   },
// });

// // Listen for connection events
// io.on('connection', (socket) => {
//   logger.info('New client connected');

//   socket.on('disconnect', () => {
//     logger.info('Client disconnected');
//   });

//   // Define custom events for chat
//   socket.on('sendMessage', (message) => {
//     logger.info('Message received: ', message);
//     // Broadcast the message to all connected clients
//     io.emit('receiveMessage', message);
//   });
// });

// Connect to MongoDB
mongoose.connect(config.mongoose.url, config.mongoose.options).then(() => {
  logger.info('Connected to MongoDB');
  server.listen(config.port, () => {
    logger.info(`Listening to port ${config.port}`);
  });
});

const exitHandler = () => {
  if (server) {
    server.close(() => {
      logger.info('Server closed');
      process.exit(1);
    });
  } else {
    process.exit(1);
  }
};

const unexpectedErrorHandler = (error) => {
  logger.error(error);
  exitHandler();
};

process.on('uncaughtException', unexpectedErrorHandler);
process.on('unhandledRejection', unexpectedErrorHandler);

process.on('SIGTERM', () => {
  logger.info('SIGTERM received');
  if (server) {
    server.close();
  }
});
