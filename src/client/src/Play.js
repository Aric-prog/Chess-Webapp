import React, {useState, useEffect, useRef} from "react";
import Board from "./Board"
import MatchHistory from "./MatchHistory"
import * as Chess from "chess.js";
import { useAuth } from './firebase/AuthContext';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const Play = () => {
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [roomCode, setRoomCode] = useState("");
    // const [side, setSide] = useState("white");
    const [roomStatus, setStatus] = useState("not connected to room");
    const [draggable, setDraggable] = useState(false);
    

    const { currentUser } = useAuth();
    const game = useRef(new Chess());
    const side = useRef("white")
    const socket = useRef(null);
    
    useEffect(() => {
        if(currentUser === null){
            // Force user to login or regsiter if nul
        }
    }, [])

    const setSide = (s) => {
        side.current = s;
    }

    const initSocket = (roomCode) => {
        currentUser.getIdToken().then(
            token => {
                socket.current = socketIOClient(ENDPOINT, {
                    extraHeaders: {
                        authorization : "Bearer " + token,
                    }
                });
                socket.current.on("connect_error", onConnectError);
                socket.current.on("move", onReceiveMove);
                socket.current.emit('join room', roomCode, (response) => {
                    setSide(response.side);
                    game.current.load_pgn(parseMoveList(response.pgn))
                    setFen(game.current.fen());
                    setStatus("Connected to room " + roomCode)
                    
                    const isPlayerTurn = response.fen.split(" ")[1] === response.side.charAt(0)
                    if(isPlayerTurn){
                        setDraggable(true);
                    }
                })
            }
        )
    }

    const getFen = () => {
        return game.current.fen();
    }
    

    const onMove = (move, fen) => {
        // Function will be called when user drops their chesspiece
        if(socket.current !== null){
            socket.current.emit("move", move, fen, (response) => {
                if(response.status === "move accepted"){
                    setDraggable(false);
                    checkGameOver();
                }
            })
        }
    }
    
    const onReceiveMove = (move) => {
        setDraggable(true);
        game.current.move(move);
        setFen(getFen());
        checkGameOver();
    }

    const onConnectError = (err) => {
        // Show error message on some random dom element
        setStatus(err.message);
    } 

    const joinRoom = (roomCode) => {
        if(socket.current === null){
            initSocket(roomCode)
        }
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        joinRoom(roomCode)
    }

    const parseMoveList = (list) => {
        var i;
        var output = "";
        for(i = 0; i < list.length; i++){
            output += i + '. ' + list[i];
        }
        return output;
    }

    const checkGameOver = () => {
        console.log(side.current)
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
            // Post history result here
            socket.current.emit("game over", game.current.fen(), game.current.pgn(), side.current)
        }
    }

    return (
        <div className="big-wrapper">
            <div className="game-container">
                <Board game = {game} width = {600} fen = {fen} setFen={setFen} orientation = {side.current} onMove = {onMove} draggable = {draggable}/>
                <div className="play-info">
                    <form onSubmit={handleSubmit} className="room-form">
                        <input type="text" className="room-input" placeholder="Insert room code here" value={roomCode} onInput={e => setRoomCode(e.target.value)}></input>
                        <input type="submit" value="Create or join room" className="room-button"></input>
                    </form>
                    <div>
                    <div className="room-status">Status : {roomStatus}</div>
                    <MatchHistory></MatchHistory>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Play