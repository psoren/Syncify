module.exports = (io) => {
    io.on('connection', client => {
        client.on('togglePublic', data =>
            io.sockets.in(data.roomId).emit('togglePublic'));
    });
}