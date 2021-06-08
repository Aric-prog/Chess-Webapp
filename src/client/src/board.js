import React, { useEffect, useState } from "react";

import Chessboard from "chessboardjsx";

const Board = (props) => {
	const [dropSquareStyle, setDropSquareStyle] = useState({});
	const [squareStyles, setSquareStyles] = useState({});
	const [square, setSquare] = useState("");
	const [width, setWidth] = useState(props.width);

	let game = props.game;

	useEffect(() => {
		updatePiece()
	}, [props.fen])

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

    const updatePiece = () => {
		props.setFen(props.fen);
    }

    return(
		<Chessboard width={width} position={props.fen} orientation={props.orientation} draggable={props.draggable} onDrop={onDrop} boardStyle={{
			borderRadius: "5px",
			boxShadow : "0 5px 15px rgba(0, 0, 0, 0.5)"}} />
	)
}

export default Board