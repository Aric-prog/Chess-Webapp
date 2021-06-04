import React, {useState, useEffect, useRef} from "react";
import Board from "./Board"
import MatchHistory from "./MatchHistory"
import * as Chess from "chess.js";
import { useAuth } from './firebase/AuthContext';
import { auth } from "./firebase/firebase-config";

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const Play = () => {
    const [fen, setFen] = useState("rnbqkbnr/pppppppp/8/8/8/8/PPPPPPPP/RNBQKBNR w KQkq - 0 1")
    const [uid, setUid] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const { currentUser } = useAuth()
    const game = useRef(new Chess())
    const socket = useRef(null)
    const board = useRef()
    
    useEffect(() => {
        if(currentUser !== null){
            initSocket(currentUser.getIdToken())
        }
    }, [])

    const initSocket = (token) => {
        socket.current = socketIOClient(ENDPOINT, {
            extraHeaders: {
                "authorization" : token
            }
        });
        socket.current.on("move", onReceiveMove);
    }

    const getFen = () => {
        return game.current.fen();
    }

    const onMove = (move, fen) => {
        // Function will be called when user drops their chesspiece
        socket.current.emit("move", move, fen, (response) => {
            console.log(response.status)
        })        
    }
    
    const onReceiveMove = (move) => {
        game.current.move(move);
        setFen(getFen())
    }

    const joinRoom = (roomCode) => {
        socket.current.emit('join room', roomCode)
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        joinRoom(roomCode)
    }

    return (
        <div className="big-wrapper">
            <div className="game-container">
                <Board ref={board} game = {game} width = {600} fen = {fen} setFen={setFen} onMove = {onMove}/>
                <MatchHistory></MatchHistory>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={roomCode} onInput={e => setRoomCode(e.target.value)}></input>
                    <input type="submit" value="Submit"></input>
                </form>
            </div>
        </div>
    );
}

export default Play