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
    io.use(auth)
    io.on('connect', socket => {
        const uidFromMiddleware = socket.handshake.headers.uid
        socket.on('join room', (roomCode, callback) => {
            if(!(roomCode in roomInfo)){
                // Room not in room list, creating room
                console.log(roomCode)
                roomInfo[roomCode] = new Room();
            }
            playerRoom[uidFromMiddleware] = roomCode;
            roomInfo[roomCode].assignPlayer(uidFromMiddleware);
            console.log(roomInfo[roomCode].whitePlayerUID, roomInfo[roomCode].blackPlayerUID)
            socket.join(roomCode);
            console.log("Player : " + uidFromMiddleware + " has joined room : " + roomCode);
            // Callback moment here with pgn
            callback({
                side : roomInfo[roomCode].getSideOfPlayer(uidFromMiddleware),
                fen : roomInfo[roomCode].currentFen
            })
        })
        socket.on('move', (move, fen, callback) => {
            // If move is valid to current roomCode
            // Get uid and the room
            // console.log(uidFromMiddleware)
            const currentRoom = roomInfo[playerRoom[uidFromMiddleware]]
            if(currentRoom.currentFen === fen){
                newFen = validateMove(move, fen)
                console.log(move.san)
                if(newFen){
                    currentRoom.setFen(newFen)
                    currentRoom.history.push(move.san)
                    io.to(playerRoom[uidFromMiddleware]).emit('move', move)
                    callback({status:"ok"})
                }
            }
            // Move denied, refresh browser
            callback({status:"not ok"})
        })
    });
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