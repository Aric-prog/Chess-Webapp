const { Chess } = require('./chess.js')
const chess = new Chess()

module.exports = function(io) {
    // console.log('IO: ', io);
    io.on('connect', socket => {
        console.log("user connected");
        socket.on('message', msg => {
            console.log('message' + msg)
        })
        socket.on('join room', roomCode, socket => {
            socket.join(roomCode)
            // Put user socket in a list somewhere, with key being socket and value being the roomCode
        })
        socket.on('pieceMove', roomCode, move, currentFen => {
            // If move is valid to current roomCode
            // 
        })
    });
};

const validateMove = function(fen, move){
    if(chess.load(fen)){
        // Position failed to load, tell client to refresh their browser
        return false
    } else{
        move = chess.move(move)
    }

    if(move !== null){
        return true
    } else{
        // Move illegal
        return false
    }
}