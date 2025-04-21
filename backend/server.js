const express = require('express');
const dotenv = require('dotenv');
const cors = require('cors')
dotenv.config();

const app = express();

// Middleware
app.use(express.json())
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from Angular (frontend)
    methods: ['GET', 'POST'], // Allow specific methods
}));

// connect mongoDB
const connectDB = require('./config/db');
connectDB();

// connect socket
const http = require('http');
const server = http.createServer(app);
const { Server } = require('socket.io');
const io = new Server(server, {
    cors: {
        origin: 'http://localhost:4200', // Angular frontend port
        methods: ['GET', 'POST']
    }
})
const connectSocket = require('./config/socket');
connectSocket(io);

// routes 
const messageRoutes = require('./routes/messageRouter')
app.use('/api/messages', messageRoutes)

const PORT = process.env.PORT || 3000;
server.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});