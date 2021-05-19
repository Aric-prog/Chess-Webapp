import React from "react";
import Board from "./Board"
import MatchHistory from "./MatchHistory"
import * as Chess from "chess.js";

class Play extends React.Component{
    state = {}
    getChessObject = () => {
        this.game = new Chess();
        return this.game;
    }
    
    getFen = () => {
        return this.game.fen();
    }

    render(){
        return (
            <div className="home-wrapper" onClick={this.getFen}>
                <div className="game-container">
                    <Board getChessObject = {this.getChessObject} width = {600}/>
                    <MatchHistory></MatchHistory>
                </div>
            </div>
        );
    }
}


export default Play