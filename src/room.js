class Room{
    constructor(){
        this.currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        this.pgn = ""
        this.whitePlayerUID = "";
        this.blackPlayerUID = "";
        this.whiteTimeInSeconds = 60 
        this.blackTimeInSeconds = 60 
    }
    setFen(fen){
        this.currentFen = fen
    }

    setBlackUID(uid){
        this.blackPlayerUID = uid 
    }
    setWhiteUID(uid){
        this.whitePlayerUID = uid
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
                        break;
                    case 1:
                        this.setBlackUID(uid)
                        break;
                }
            } else if(this.whitePlayerUID === ""){
                this.whitePlayerUID = uid
            } else if(this.blackPlayerUID === ""){
                this.blackPlayerUID = uid
            }
        }
    }

    decrementTime(){
        if(this.currentFen.split(" ")[1] === "w"){
            this.whiteTimeInSeconds -= 1
        } else{
            this.blackTimeInSeconds -= 1
        }
    }
}

module.exports = {Room}