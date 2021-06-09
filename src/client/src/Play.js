import React, {useState, useEffect, useRef} from "react";
import Board from "./Board"
import MatchHistory from "./MatchHistory"
import * as Chess from "chess.js";
import { useAuth } from './firebase/AuthContext';

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const Play = () => {
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1");
    const [uid, setUid] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const [side, setSide] = useState("white");
    const [roomStatus, setStatus] = useState("not connected to room");
    const [moveStack, setMoveStack] = useState([]);
    const [history, setHistory] = useState([]);
    const [draggable, setDraggable] = useState(false);
    
    const { currentUser } = useAuth();
    const game = useRef(new Chess());
    const socket = useRef(null);
    
    useEffect(() => {
        if(currentUser === null){
            // Force user to login or regsiter if nul
        }
    }, [])

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
                    console.log(response.fen.split(" ")[1] === response.side.charAt(0))
                    if(isPlayerTurn){
                        setDraggable(true);
                    }
                    // game.current.load(response.fen);
                })
            }
        )
    }

    const getFen = () => {
        return game.current.fen();
    }
        
    const undoMove = () => {
        if(moveStack.length !== history.length && moveStack){
            const move = game.current.undo()
            if(move !== null){
                moveStack.push(move)
                setFen(getFen())
            }
        }
    }
    const redoMove = () => {
        if(moveStack.length !== 0){
            const move = moveStack.pop()
            if(move !== null){
                game.current.move(move)
                setFen(getFen())
            }
        }
    }

    const onMove = (move, fen) => {
        // Function will be called when user drops their chesspiece
        if(socket.current !== null){
            socket.current.emit("move", move, fen, (response) => {
                if(response.status === "move accepted"){
                    setDraggable(false)
                }
            })
        }
    }
    
    const onReceiveMove = (move) => {
        setDraggable(true)
        game.current.move(move);
        setMoveStack(game.current.history())
        setFen(getFen())
    }

    const onConnectError = (err) => {
        // Show error message on some random dom element
        const errMessage = err.message
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

    return (
        <div className="big-wrapper">
            <div className="game-container">
                <Board game = {game} width = {600} fen = {fen} setFen={setFen} orientation = {side} onMove = {onMove} draggable = {draggable}/>
                <div className="play-info">
                    <form onSubmit={handleSubmit} className="room-form">
                        <input type="text" className="room-input" placeholder="Insert room code here" value={roomCode} onInput={e => setRoomCode(e.target.value)}></input>
                        <input type="submit" value="Create or join room" className="room-button"></input>
                    </form>
                    <div>
                    <div className="room-status">Status : {roomStatus}</div>
                    <MatchHistory></MatchHistory>
                    </div>
                    {/* <div onClick={undoMove}>
                        Left
                    </div>
                    <div onClick={redoMove}>
                        Right
                    </div> */}
                </div>
            </div>
        </div>
    );
}

export default Play