import React, { useState, useEffect } from "react";
import socketIOClient from "socket.io-client";
const ENDPOINT = "http://127.0.0.1:5000";

class test extends React.Component{

    componentDidMount() {
        const socket = socketIOClient(ENDPOINT);
        socket.on("enemyMove", data => {
            // Handle enemy move
        })
    }
    // useEffect(() => {
    //     const socket = socketIOClient(ENDPOINT);
    //     socket.on("FromAPI", data => {
    //       setResponse(data);
    //     });
    //   }, []);
    
    render() {
        return(
            <div>asdf</div>
        )
    };
}

export default test;