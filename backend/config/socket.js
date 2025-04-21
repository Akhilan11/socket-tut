const users = new Map()
const usernameToSocket = new Map()

const connectSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
    
        // Listen for messages from the client
        socket.on('chat message', (data) => {
            console.log('message: ' + data);
            const {username , content} = data
            io.emit('chat message', data);
        });

        // Listen for username when user connected
        socket.on('new user', (username) => {
            users.set(socket.id, username)
            usernameToSocket.set(username, socket.id);
            io.emit('active users', Array.from(usernameToSocket.keys()));
            // io.emit('active users', Array.from(users.values()))
        })

        // Private message
        socket.on('private message',(data) => {
            const {receiver, message, sender} = data
            const receiverId = usernameToSocket.get(receiver)

            if(receiverId) {
                io.to(receiverId).emit('private message', {sender, message})
            } else {
                console.log(`Receiver ${receiver} not online.`);
            }
        })

         // Typing logic
        socket.on('typing', (data) => {
            io.emit('display', data); // send typing status to all clients
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
            
            // Use the users map to get the username for the current socket
            const username = users.get(socket.id);
        
            if (username) {
                // Remove from both maps
                users.delete(socket.id);
                usernameToSocket.delete(username);
        
                // Emit the updated list of active users
                io.emit('active users', Array.from(usernameToSocket.keys()));  // Update active users
            }
        });
    });
}

module.exports = connectSocket;