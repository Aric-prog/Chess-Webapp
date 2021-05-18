module.exports = function(io) {
    // console.log('IO: ', io);
    io.on('connect', socket => {
        console.log("user connected");
        socket.on('message', msg => {
            console.log('message' + msg)
        })
    });
};