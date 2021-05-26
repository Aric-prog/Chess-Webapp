const { Chess } = require('chess.js')
const admin = require("./admin");
const auth = require("./socket-auth")
const room = require("../room")
const chess = new Chess()

// Room Info, with key being id and room being the infos
var roomInfo = {}

// Contains someone's uid and their room
var playerRoom = {}

function init_io(io) {
    // Checks if user is authenticated here
    
    io.on('connect', socket => {
        console.log("well that's funny");
        socket.on('join room', (roomCode) => {
            console.log(roomCode)
            if(!roomCode in roomInfo){
                // Room not in room list, creating room
                roomInfo[roomCode] = new Room();
            }
            playerRoom[socket.id] = roomCode;
            roomInfo[roomCode].assignPlayer(socket.id);
            socket.join(roomCode);
            console.log("player : " + socket.id + " has joined room : " + roomCode);
            // Put user socket in a list somewhere, with key being socket and value being the roomCode
        })
        socket.on('move', (move, fen, callback) => {
            // If move is valid to current roomCode
            // Get uid and the room
            var uidFromMiddleware = socket.id
            if(roomInfo[playerRoom[uidFromMiddleware]].currentFen === fen){
                if(validateMove(move, fen)){
                    io.to(playerRoom[uidFromMiddleware]).emit('move', move)
                    callback({status:"ok"})
                }
            }
            // Move denied, refresh browser
            callback({status:"not ok"})
        })
    });

    // io.use(auth)
};

module.exports = init_io

const validateMove = function(move, fen){
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