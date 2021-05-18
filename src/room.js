class Room{
    constructor(whitePlayerUID, blackPlayerUID){
        this.currentFen = "rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1"
        this.whitePlayerUID = whitePlayerUID;
        this.blackPlayerUID = blackPlayerUID;
        this.whiteTimeInSeconds = "60" 
        this.blackTimeInSeconds = "60" 
    }
    createIntervals(){
        this.roomTimer = setInterval(this.decrementTime(), 1000)
    }
    clearIntervals(){
        clearInterval(this.roomTimer)
    }
    decrementTime(){
        if(this.currentFen.split(" ")[1] === "w"){
            this.whiteTimeInSeconds -= 1
        } else{
            this.blackTimeInSeconds -= 1
        }
    }
}