import { useState } from "react";
import Members from './Members';
import bryan from './images/bepe.jpg'
import aric from './images/aric.jpg'
import jocelyn from './images/joce.jpg'

const About = () => {

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
        <div className="big-wrapper">
            <div className="container">
                <div className="thanks-wrapper">
                    <h1>THANKS FOR PLAYING!</h1>
                    <p>This was a project that we made for our Web Application Development and Security course. It involves several technologies and framework such as React, Nodejs, Socket.io, and Firebase.
                        
                    </p>
                </div>
                <div className="member-wrapper">
                    <Members members={members}></Members>
                </div>
            </div>
        </div>
    );
}

export default About;