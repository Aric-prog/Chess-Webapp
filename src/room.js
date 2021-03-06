const admin = require("./middleware/admin");

class Room{
    constructor(roomCode, roomFilledCallback){
        this.currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        this.history = []
        this.whitePlayerUID = "";
        this.whitePlayerName = "";
        
        this.blackPlayerUID = "";
        this.blackPlayerName = "";

        this.whiteTimeInSeconds = 60; 
        this.blackTimeInSeconds = 60;
        this.roomCode = roomCode;
        this.roomFilled = roomFilledCallback
    }
    setFen(fen){
        this.currentFen = fen
    }

    setBlackUID(uid){
        this.blackPlayerUID = uid 
        const db = admin.firestore()
        db.collection("users").doc(uid).get().then(
            doc => {
                if(doc.exists){
                    this.blackPlayerName = doc.data().username
                }
            }
        ).then(() => {
            this.checkFull()
        })
    }
    setWhiteUID(uid){
        this.whitePlayerUID = uid
        const db = admin.firestore()
        db.collection("users").doc(uid).get().then(
            doc => {
                if(doc.exists){
                    this.whitePlayerName = doc.data().username
                }
            }
        ).then(() => {
            this.checkFull();
        })
    }

    checkFull(){
        if(this.whitePlayerName && this.blackPlayerName){
            this.roomFilled(this.roomCode, this.blackPlayerName, this.whitePlayerName)
        }
    }

    createIntervals(){
        this.roomTimer = setInterval(this.decrementTime(), 1000)
    }
    clearIntervals(){
        clearInterval(this.roomTimer)
    }
    assignPlayer(uid){
        // Assign players random sides
        if(this.whitePlayerUID !== uid && this.blackPlayerUID !== uid){
            if(this.whitePlayerUID === "" && this.blackPlayerUID === ""){
                switch(Math.floor(Math.random() * 2)){
                    case 0:
                        this.setWhiteUID(uid)
                        return "white"
                    case 1:
                        this.setBlackUID(uid)
                        return "black"
                }
            } else if(this.whitePlayerUID === ""){
                this.setWhiteUID(uid)
                return "white"
            } else if(this.blackPlayerUID === ""){
                this.setBlackUID(uid)
                return "black"
            }
        }
        return ""
    }

    decrementTime(){
        if(this.currentFen.split(" ")[1] === "w"){
            this.whiteTimeInSeconds -= 1
        } else{
            this.blackTimeInSeconds -= 1
        }
    }

    getSideOfPlayer(uid){
        if(this.blackPlayerUID === uid){
            return "black"
        } else if(this.whitePlayerUID === uid){
            return "white"
        }
    }
}

module.exports = {Room}