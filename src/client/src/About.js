import { useState } from "react";
import Members from './Members';
import bryan from './images/bepe.jpg'
import aric from './images/bepe.jpg'

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
            image: bryan,
            desc: `I'm a gaymer`
        }
    ]);

    return (
        <div className="big-wrapper">
            <div className="container">
                <div className="thanks-wrapper">
                    <h1>THANKS FOR PLAYING!</h1>
                    <p>This was a project that we were forced to make u fucks kill me pls dunia ini sesat :DDDDDDDDDDDDD
                    Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quam cumque culpa, optio autem vel tempora fuga earum eveniet dolorem temporibus vero cum deleniti, quibusdam corporis quod dicta vitae atque.Lorem ipsum dolor sit amet consectetur adipisicing elit. Magnam quam cumque culpa, optio autem vel tempora fuga earum eveniet dolorem temporibus vero cum deleniti, quibusdam corporis quod dicta vitae atque.</p>
                </div>
                <div className="member-wrapper">
                    <Members members={members}></Members>
                </div>
            </div>
        </div>
    );
}

export default About;