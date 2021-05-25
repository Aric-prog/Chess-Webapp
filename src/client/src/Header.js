import { useState } from 'react';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';

const Header = () => {

    const linkTemp = "#";

    return (
        <nav className="navbar">
            <div className="container">
                <div className="header-left">
                    <ul className="header-left-list">
                        {/* <li ><a href={linkTemp} className="logo" ><i class="fas fa-chess-board"></i> Chess</a></li>
                        <li ><a href={linkTemp} className="learn" >Learn</a></li>
                        <li ><a href={linkTemp} className="play" >Play</a></li>
                        <li ><a href={linkTemp} className="about-us" >About Us</a></li> */}
                        <li><Link to="/home" className="logo"> <i class="fas fa-chess-board"></i> Chess</Link></li>
                        <li><Link to="/learn" className="learn"> Learn</Link></li>
                        <li><Link to="/play" className="play"> Play</Link></li>
                        <li><Link to="/about-us" className="about-us"> About Us</Link></li>
                    </ul>
                </div>
                <div className="header-right">
                    <div className="sign-container">
                        <a href={linkTemp} className="signin" onClick={() => {return(
                            <LoginModal></LoginModal>
                        )}}>Sign in</a>
                        <a href={linkTemp} className="signup">Sign up</a>    
                    </div>
                </div>
            </div>


        </nav>
    );
}

export default Header;