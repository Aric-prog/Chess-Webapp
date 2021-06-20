const { Chess } = require('chess.js')
const auth = require("./socket-auth")
const { Room } = require("../room")
const admin = require("./admin");
const chess = new Chess()

// room Info, with key being id and room being the infos
var roomInfo = {}

// contains someone's uid and their room
var playerRoom = {}

function init_io(io) {
    // check if user is authenticated here
    io.use(auth)
    io.on('connect', socket => {
        const uidFromMiddleware = socket.uid;
        socket.on('join room', (roomCode, callback) => {
            if(!(roomCode in roomInfo)){
                // if room not in room list, creating room
                roomInfo[roomCode] = new Room(roomCode, roomFilled);
            }
            playerRoom[uidFromMiddleware] = roomCode;
            socket.join(roomCode);
            
            // calls the callback function provided by client side event
            callback({
                side : roomInfo[roomCode].assignPlayer(uidFromMiddleware),
                fen : roomInfo[roomCode].currentFen,
                pgn : roomInfo[roomCode].history
            })
        })
        socket.on('move', (move, fen, callback) => {
            // if move is valid to current roomCode
            // get uid and the room
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
            // move denied, refresh browser
            callback({status:"move denied"})
        })

        // receives and verifies game over event from client
        // deletes room and writes to firebase on valid event
        socket.on('game over', (fen, pgn, side) => {
            const currentRoom = roomInfo[playerRoom[uidFromMiddleware]];
            const roomKey = playerRoom[uidFromMiddleware];
            const db = admin.firestore()
            if(currentRoom !== undefined){
                delete playerRoom[uidFromMiddleware];
                
                var playerName = "";
                var playerUID = "";
                var enemyName = "";
                if(side === "white"){
                    playerName = currentRoom.whitePlayerName;
                    playerUID  = currentRoom.whitePlayerUID;
                    enemyName = currentRoom.blackPlayerName;
                } else if(side === "black"){
                    playerName = currentRoom.blackPlayerName;
                    playerUID  = currentRoom.blackPlayerUID;
                    enemyName = currentRoom.whitePlayerName;
                }
                const matchData = {
                    enemy : enemyName,
                    pgn : pgn,
                    result : getWinner(fen, side),
                    side : side
                }
                const ref = db.collection('history').doc(playerUID)
                ref.get().then((doc) => {
                    if(doc.exists){
                        var hist = doc.data().history;
                        hist.push(matchData)
                        ref.set({
                            history: hist
                        })
                    } else{
                        ref.set({
                            history : [matchData]
                        })
                    }
                })
                
                if(!(currentRoom.whitePlayerUID in playerRoom) && !(currentRoom.blackPlayerUID in playerRoom)){
                    delete roomInfo[roomKey]
                }
            }
        })
    });

    const roomFilled = (roomCode, name1, name2) => {
        io.to(roomCode).emit('room filled', name1, name2)
    }
};

module.exports = init_io

// validate move given from player
const validateMove = function(move, fen){
    if(chess.load(fen)){
        // position failed to load, tell client to refresh their browser
        moveObj = chess.move(move)
    } else{
        return false
    }
    
    if(moveObj !== null){
        return chess.fen()
    } else{
        // move illegal
        return false
    }
}

// gets the winner of a game, given a side
const getWinner = (fen, side) => {
    chess.load(fen)
    if(chess.game_over()){
        if(chess.in_draw() || chess.in_stalemate()){
            return "D";
        } else if(chess.fen().split(" ")[1] === side.charAt(0)){
            return "L";
        } else{
            return "W";
        }
    }
}