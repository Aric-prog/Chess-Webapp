import React, { useEffect, useState } from "react";

import Chessboard from "chessboardjsx";

const Board = (props) => {
	const [dropSquareStyle, setDropSquareStyle] = useState({});
	const [squareStyles, setSquareStyles] = useState({});
	const [square, setSquare] = useState("");
	const [width, setWidth] = useState(props.width);

	let game = props.game;

	useEffect(() => {
		console.log("this is called right?")
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
		setSquareStyles(squareStyling());
    };

    const updatePiece = () => {
		props.setFen(props.fen);
		// setSquareStyles(squareStyling())
    }

	const squareStyling = () => {
		const history = game.current.history({verbose : true})
		const sourceSquare = history[history.length - 1].from;
		const targetSquare = history[history.length - 1].to;
		const bgColor = "rgba(255, 255, 0, 0.4)";
	
		return {
			sourceSquare : {backgroundColor : bgColor},
			targetSquare : {backgroundColor : bgColor}
		};
	};
	
    return(
		<Chessboard width={width} position={props.fen} onDrop={onDrop} squareStyles={squareStyles} boardStyle={{
			borderRadius: "5px",
			boxShadow : "0 5px 15px rgba(0, 0, 0, 0.5)"}} />
	)

}

export default Board