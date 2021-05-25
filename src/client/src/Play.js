import React from "react";
import Board from "./Board"
import MatchHistory from "./MatchHistory"
import * as Chess from "chess.js";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

class Play extends React.Component{
    state = {}
    getChessObject = () => {
        this.game = new Chess();
        return this.game;
    }
    
    getFen = () => {
        return this.game.fen();
    }

    onMove = (move, fen) => {
        // Function will be called when user drops their chesspiece
        this.socket.emit("move", move, fen, (response) => {
            console.log(response.status)
        })        
    }
    
    onReceiveMove = (move) => {
        this.game.move(move);
        this.child.current.movePiece()
    }

    joinRoom = (roomCode) => {
        this.socket.emit('join room', roomCode, this.socket)
    };

    componentDidMount() {
        this.socket = socketIOClient(ENDPOINT);
        this.board = React.createRef();
        this.socket.on("move", this.onReceiveMove)
        // firebase.initializeApp(firebaseConfig)
    }

    handleSubmit(event) {
        this.joinRoom(event.target.value)
    }

    // loginAnon(){
    //     firebase.auth().signInAnonymously()
    //         .then(() => {

    //         })
    //         .catch((error) => {

    //         })
    // }   

    render(){
        return (
            <div className="home-wrapper" onClick={this.getFen}>
                <div className="game-container">
                    <Board ref={this.child} getChessObject = {this.getChessObject} width = {600}/>
                    <MatchHistory></MatchHistory>
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.roomCode}></input>
                        <input type="submit" value="Submit"></input>
                    </form>
                    <button type="button"> Login Anonymously </button>
                </div>
            </div>
        );
    }
}


export default Play