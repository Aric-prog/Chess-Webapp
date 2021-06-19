// import react, chessboard
import React, { useEffect, useState } from "react";

import Chessboard from "chessboardjsx";

// the chess board
const Board = (props) => {
	
	// set constants
	const [width, setWidth] = useState(props.width);

	let game = props.game;

	// do on render
	useEffect(() => {
		updatePiece()
	}, [props.fen])

	// on moving a chess piece
    const onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = game.current.move({
        	from: sourceSquare,
        	to: targetSquare,
        	promotion: "q" // always promote to a queen for example simplicity
        });
		
        // illegal move
        if (move === null) return;
		props.onMove(move, props.fen)
		props.setFen(game.current.fen());
    };

	// update the piece
    const updatePiece = () => {
		props.setFen(props.fen);
    }

    return(
		// html code
		<Chessboard width={width} position={props.fen} orientation={props.orientation} draggable={props.draggable} onDrop={onDrop} boardStyle={{
			borderRadius: "5px",
			boxShadow : "0 5px 15px rgba(0, 0, 0, 0.5)"}} />
	)
}

// export Board
export default Board