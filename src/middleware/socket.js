const { Chess } = require('chess.js')
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
        const uidFromMiddleware = socket.uid;
        socket.on('join room', (roomCode, callback) => {
            if(!(roomCode in roomInfo)){
                // Room not in room list, creating room
                roomInfo[roomCode] = new Room();
            }
            playerRoom[uidFromMiddleware] = roomCode;
            socket.join(roomCode);
            
            console.log(roomInfo[roomCode].whitePlayerUID, roomInfo[roomCode].blackPlayerUID)
            console.log("Player : " + uidFromMiddleware + " has joined room : " + roomCode);
            // Callback moment here with pgn
            callback({
                side : roomInfo[roomCode].assignPlayer(uidFromMiddleware),
                fen : roomInfo[roomCode].currentFen,
                pgn : roomInfo[roomCode].history,
                whitePlayerName : roomInfo[roomCode].whitePlayerName,
                blackPlayerName : roomInfo[roomCode].blackPlayerName
            })
        })
        socket.on('move', (move, fen, callback) => {
            // If move is valid to current roomCode
            // Get uid and the room
            const currentRoom = roomInfo[playerRoom[uidFromMiddleware]]
            if(currentRoom.currentFen === fen){
                newFen = validateMove(move, fen)
                if(newFen){
                    currentRoom.setFen(newFen)
                    currentRoom.history.push(move.san)
                    io.to(playerRoom[uidFromMiddleware]).emit('move', move)
                    callback({status:"move accepted", move: move})
                }
            }
            // Move denied, refresh browser
            callback({status:"move denied"})
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