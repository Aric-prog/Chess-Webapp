const { Chess } = require('chess.js')
const admin = require("./admin")
const chess = new Chess()

// Room Info, with key being id and room being the infos
var roomInfo = {}

// Contains someone's uid and their room
var playerRoom = {}
module.exports = function(io) {
    
    // Checks if user is authenticated here
    io.use((socket, next) => {
        headerToken = socket.handshake.authorization
        if(!headerToken){
            err = new Error("No Token provided")
            next(err)
        }
    
        if(headerToken && headerToken.split(" ")[0] !== "Bearer"){
            err = new Error("Invalid token")
            next(err)
        }
    
        const token = token.split(" ")[1];
        admin
            .auth()
            .verifyIdToken(token)
            .then(() => next())
            .catch(() => next(new Error("Could not authenticate")))
    })
    io.on('connect', socket => {
        socket.on('message', msg => {
            console.log('message' + msg)
        })
        socket.on('join room', roomCode, socket => {
            if(!roomCode in roomInfo){
                socket.join(roomCode)
            } else{
                console.log("no room found")
            }
            // Put user socket in a list somewhere, with key being socket and value being the roomCode
        })
        socket.on('move', (move, fen, callback) => {
            // If move is valid to current roomCode
            // Get uid and the room
            var uidFromMiddleware = ""
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
};

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