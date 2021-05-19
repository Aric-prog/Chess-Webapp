import React, { Component } from "react";
import * as Chess from "chess.js";

import Chessboard from "chessboardjsx";

class Board extends Component{
    state = {
        fen: "start",
        // square styles for active drop square
        dropSquareStyle: {},
        // custom square styles
        squareStyles: {},
        // square with the currently clicked piece
        pieceSquare: "",
        // currently clicked square
        square: "",
        // array of past game moves
        history: [],
        width : this.props.width,
    };
    componentDidMount() {
        this.game = this.props.getChessObject();
    }
    onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = this.game.move({
          from: sourceSquare,
          to: targetSquare,
          promotion: "q" // always promote to a queen for example simplicity
        });
    
        // illegal move
        if (move === null) return;
        console.log(this.game.pgn())
        this.setState(({ history, pieceSquare }) => ({
          fen: this.game.fen(),
          history: this.game.history({ verbose: true }),
          squareStyles: squareStyling({ pieceSquare, history })
        }));
    };

    render() {
        const {fen, width} = this.state
        return(
            <Chessboard width={width} position={fen} onDrop={this.onDrop} />
        )
    }
}

const squareStyling = ({ pieceSquare, history }) => {
    const sourceSquare = history.length && history[history.length - 1].from;
    const targetSquare = history.length && history[history.length - 1].to;
  
    return {
        [pieceSquare]: { backgroundColor: "rgba(255, 255, 0, 0.4)" },
        ...(history.length && {
        [sourceSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
        }),
        ...(history.length && {
        [targetSquare]: {
          backgroundColor: "rgba(255, 255, 0, 0.4)"
        }
        })
    };
};

export default Board