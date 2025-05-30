
const configSocket = (io) => {
    io.on('connection', (socket) => {
        console.log('a user connected');
        
        socket.on('chat message', (msg) => {
            console.log('message: ' + msg.content);
            io.emit('chat message', msg)
        });

        socket.on('disconnect', () => {
            console.log('user disconnected');
        });
    });
}

module.exports = configSocket

