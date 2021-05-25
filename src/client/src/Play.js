import React, {useState, useEffect, useRef} from "react";
import Board from "./Board"
import MatchHistory from "./MatchHistory"
import * as Chess from "chess.js";
import { auth } from "./firebase/firebase-config"

import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

const Play = () => {
    const [uid, setUid] = useState("");
    const [roomCode, setRoomCode] = useState("");
    const game = useRef(new Chess())
    const socket = useRef(null)
    const board = useRef()
    
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
        board.current.movePiece()
    }

    const joinRoom = (roomCode) => {
        socket.current.emit('join room', roomCode, socket.current)
    };

    useEffect(() => {
        socket.current = socketIOClient(ENDPOINT);
        
        socket.current.on("move", onReceiveMove);
    }, [])

    const handleSubmit = (event) => {
        joinRoom(event.target.value)
    }

    const loginAnon= () => {
        auth().signInAnonymously()
            .then((userCred) => {
                setUid(userCred.user.uid)
                console.log("success")
            })
            .catch((error) => {
                console.log(error)
            })
    }   

    return (
        <div className="home-wrapper" onClick={getFen}>
            <div className="game-container">
                <Board ref={board} game = {game.current} width = {600}/>
                <MatchHistory></MatchHistory>
                <form onSubmit={handleSubmit}>
                    <input type="text" value={roomCode}></input>
                    <input type="submit" value="Submit"></input>
                </form>
                <button type="button"> Login Anonymously </button>
            </div>
        </div>
    );
}


export default Play