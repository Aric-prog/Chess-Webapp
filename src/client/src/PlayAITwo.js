import * as Chess from "chess.js";
import { useEffect, useState, useRef } from "react";
import MatchHistory from "./MatchHistory"
import Board from "./Board"

const PlayAITwo = () => {
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [draggable, setDraggable] = useState(true)
    const [status, setStatus] = useState("Fighting against hard bot")
    const side = useRef("white")
    const game = useRef(new Chess())
	
    const onMove = () => {
		setDraggable(false)
		if(!checkGameOver()){
            fetch('https://ai.chess-webapp.com/engine', {
                method: 'POST',
                mode : 'cors',
                headers: {
                    'Content-Type' : 'application/json'
                },
                body : JSON.stringify({"fen" : game.current.fen()})
            })
            .then(res => res.json())
            .then(data => {
                console.log(data.move)
                game.current.move(data.move, {sloppy : true})
                setFen(game.current.fen())
                setDraggable(!checkGameOver())
            }).catch(() => {
                setStatus("Failed to connect to server")
            })
        }
    }

	const checkGameOver = () => {
		if(game.current.game_over()){
            setDraggable(false);
            if(game.current.in_stalemate()){
                setStatus("Stalemate")
            } else if(game.current.in_draw()){
                setStatus("Game drawn")
            } else if(game.current.fen().split(" ")[1] === side.current.charAt(0)){
                setStatus("Checkmate, " + side.current + " loses")
            } else{
                setStatus("Checkmate, " + side.current + " wins")
            }
			return true
        }
		return false
	}

    return (
        <div className="big-wrapper">
            <div className="game-container">
                <Board game = {game} width = {600} fen = {fen} setFen={setFen} orientation = {side.current} onMove = {onMove} draggable = {draggable}/>
                <div className="play-info">
                    <div>
                        <div className="room-status">Status : {status}</div>
                        <MatchHistory pgn ={game.current.pgn()}></MatchHistory>
                    </div>
                </div>
            </div>
        </div>
    );
}
 
export default PlayAITwo;