const { Chess } = require('chess.js')
const admin = require("./admin");
const auth = require("./socket-auth")
const { Room } = require("../room")
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
            if(!(roomCode in roomInfo)){
                // Room not in room list, creating room
                console.log(roomCode)
                roomInfo[roomCode] = new Room();
            }
            playerRoom[socket.id] = roomCode;
            roomInfo[roomCode].assignPlayer(socket.id);
            console.log(roomInfo[roomCode].whitePlayerUID, roomInfo[roomCode].blackPlayerUID)
            socket.join(roomCode);
            console.log("player : " + socket.id + " has joined room : " + roomCode);
            // Put user socket in a list somewhere, with key being socket and value being the roomCode
        })
        socket.on('move', (move, fen, callback) => {
            // If move is valid to current roomCode
            // Get uid and the room
            const uidFromMiddleware = socket.id
            const currentRoom = roomInfo[playerRoom[uidFromMiddleware]]
            console.log(currentRoom.currentFen)
            console.log(fen)
            if(currentRoom.currentFen === fen){
                newFen = validateMove(move, fen)
                if(newFen){
                    currentRoom.setFen(newFen)
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
        moveObj = chess.move(move)
    } else{
        return false
    }
    
    if(moveObj !== null){
        return chess.fen()
    } else{
        // Move illegal
        return false
    }
}