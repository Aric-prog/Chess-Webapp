import React, { useState } from "react";

import Chessboard from "chessboardjsx";

const Board = (props) => {
	const [fen, setFen] = useState("start");
	const [dropSquareStyle, setDropSquareStyle] = useState({});
	const [squareStyles, setSquareStyles] = useState({});
	const [square, setSquare] = useState("");
	const [history, setHistory] = useState([]);
	const [width, setWidth] = useState(props.width);

	let game = props.game
    const onDrop = ({ sourceSquare, targetSquare }) => {
        // see if the move is legal
        let move = game.move({
        	from: sourceSquare,
        	to: targetSquare,
        	promotion: "q" // always promote to a queen for example simplicity
        });
    
        // illegal move
        if (move === null) return;
		
		setFen(game.fen());
		setHistory(game.history({verbose : true}));
		setSquareStyles(squareStyling(history))
        // setState(({ history, pieceSquare }) => ({
        //   	fen: game.fen(),
        //   	history: game.history({ verbose: true }),
        //   	squareStyles: squareStyling({ pieceSquare, history })
        // }));
    };

    const updatePiece = () => {
		setFen(game.fen());
		setSquareStyles(squareStyling(history))
    }

	const squareStyling = () => {
		const history = game.history({verbose : true})
		console.log(history)
		const sourceSquare = history[history.length - 1].from;
		const targetSquare = history[history.length - 1].to;
		const bgColor = "rgba(255, 255, 0, 0.4)";
	
		return {
			sourceSquare : {backgroundColor : bgColor},
			targetSquare : {backgroundColor : bgColor}
		};
	};
	
    return(
		<Chessboard width={width} position={fen} onDrop={onDrop} squareStyles={squareStyles} boardStyle={{
			borderRadius: "5px",
			boxShadow : "0 5px 15px rgba(0, 0, 0, 0.5)"}} />
	)

}

export default Board