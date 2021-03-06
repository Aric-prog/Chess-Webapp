//imports from react, images used
import { useState } from "react";
import Members from './Members';
import bryan from './images/bepe.jpg'
import aric from './images/aric.jpg'
import jocelyn from './images/joce.jpg'
import reactLogo from './images/reactjs-yellow.svg'
import socketIoLogo from './images/socketio-yellow.svg'
import nodeJsLogo from './images/nodejs-yellow.svg'
import fireBaseLogo from './images/firebase.svg'
import websiteIllus from './images/website2.svg'

// the About Us page
// About component declared functionally
const About = () => {

    // make constants for group member info
    const [members, setMembers] = useState([
        {
            name: 'Aric Hernando',
            image: aric,
            desc: `I'm a computer science student. Everyday it gets harder, send help.`
        },
        {
            name: 'Bryan Putra',
            image: bryan,
            desc: `Helloo! My name is Bryan. I'm just an ordinary computer science student. I love playing and
            competing in games and sports.`
        },
        {
            name: 'Jocelyn Thiojaya',
            image: jocelyn,
            desc: `I am a gamer trying my best to be a computer science student. Animals are cool.`
        }
    ]);


    return (
        // html code
        <div className="big-wrapper">
            <div className="container">
                <div className="thanks-wrapper">
                    <h1>THANKS FOR PLAYING!</h1>
                    <p>This was a project that we made for our Web Application Development and Security course. It involves several technologies and framework such as React, Nodejs, Socket.io, and Firebase.
                    </p>
                </div>
                <div className="frameworks-container">
                    <img className="website-image" src={websiteIllus} alt="bruh" />
                    <div className="framework-container">
                        <div className="framework">
                            <img src={reactLogo} alt=""/>
                            <h3>ReactJs</h3>
                        </div>
                        <div className="framework">
                            <img src={fireBaseLogo} alt=""/>
                            <h3>Firebase</h3>
                        </div>
                        <div className="framework">
                            <img src={socketIoLogo} alt="" />
                            <h3>SocketIo</h3>
                        </div>
                        <div className="framework">
                            <img src={nodeJsLogo} alt="" />
                            <h3>NodeJs</h3>
                        </div>
                    </div>
                </div>
                <div className="member-wrapper">
                    <Members members={members}></Members>
                </div>
            </div>
        </div>
    );
}

// export About
export default About;