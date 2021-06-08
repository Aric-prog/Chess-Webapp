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
    const [moveStack, setMoveStack] = useState([]);
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
                    setFen(response.fen);
                    if(response.side === "white"){
                        setDraggable(true);
                    }
                    game.current.load(response.fen);
                })
            }
        )
    }

    const getFen = () => {
        return game.current.fen();
    }
        
    const undoMove = () => {
        if(moveStack.length !== 0){
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
        if(socket.current !== null && moveStack.length === 0){
            socket.current.emit("move", move, fen, (response) => {
                if(response.status === "move accepted"){
                    setDraggable(false)
                }
            })
        }
    }
    
    const onReceiveMove = (move) => {
        setDraggable()
        game.current.move(move);
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

    return (
        <div className="big-wrapper">
            <div className="game-container">
                <Board game = {game} width = {600} fen = {fen} setFen={setFen} orientation = {side} onMove = {onMove} draggable = {draggable}/>
                <div className="play-info">
                    <form onSubmit={handleSubmit} className="room-form">
                        <p>Info : </p>
                        <input type="text" className="room-input" value={roomCode} onInput={e => setRoomCode(e.target.value)}></input>
                        <input type="submit" value="Create or join room" className="room-button"></input>
                    </form>
                    <MatchHistory></MatchHistory>
                    <div onClick={undoMove}>
                        Left
                    </div>
                    <div onClick={redoMove}>
                        Right
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Play