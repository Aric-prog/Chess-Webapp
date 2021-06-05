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
    const [side, setSide] = useState("white")
    const { currentUser } = useAuth()
    const game = useRef(new Chess())
    const socket = useRef(null)
    const board = useRef()
    
    useEffect(() => {
        if(currentUser !== null){
            initSocket()
        }
    }, [])

    const initSocket = () => {
        currentUser.getIdToken().then(
            token => {
                socket.current = socketIOClient(ENDPOINT, {
                    extraHeaders: {
                        authorization : "Bearer " + token,
                        uid : currentUser.uid
                    }
                });
                socket.current.on("connect_error", onConnectError)
                socket.current.on("move", onReceiveMove);
            }
        )
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

    const onConnectError = (err) => {
        // Show error message on some random dom element
        const errMessage = err.message
    } 

    const joinRoom = (roomCode) => {
        socket.current.emit('join room', roomCode, (response) => {
            setSide(response.side)
            setFen(response.fen)
        })
    };

    const handleSubmit = (event) => {
        event.preventDefault()
        joinRoom(roomCode)
    }

    return (
        <div className="big-wrapper">
            <div className="game-container">
                <Board ref={board} game = {game} width = {600} fen = {fen} setFen={setFen} orientation = {side} onMove = {onMove}/>
                <div className="play-info">
                    <form onSubmit={handleSubmit} className="room-form">
                        <p>Info : </p>
                        <input type="text" className="room-input" value={roomCode} onInput={e => setRoomCode(e.target.value)}></input>
                        <input type="submit" value="Create or join room" className="room-button"></input>
                    </form>
                    <MatchHistory></MatchHistory>
                </div>
            </div>
        </div>
    );
}

export default Play