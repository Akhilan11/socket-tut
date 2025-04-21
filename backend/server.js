const express = require('express')
const dotenv = require('dotenv')

const app = express()

// Middleware
app.use(express.json())
const cors = require('cors')
app.use(cors({
    origin: 'http://localhost:4200', // Allow requests from Angular (frontend)
    methods: ['GET', 'POST'], // Allow specific methods
}));

// Connect MongoDB
const connectDB = require('./config/db')
connectDB()

// Config socket
const http = require('http')
const server  = http.createServer(app)
const { Server } = require('socket.io')
const io = new Server(server, {
    cors : {
        origin : 'http://localhost:4200',
        methods : ['GET', 'POST']
    }
})
const configSocket = require('./config/socket')
configSocket(io)


// Setting up routes
const messageRoutes = require('./routes/messageRoutes')
app.use('/api/message', messageRoutes)

const PORT = process.env.PORT || 3000
server.listen(PORT, () => {
    console.log("Server running on port :", PORT)
})