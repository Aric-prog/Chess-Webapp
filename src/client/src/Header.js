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
                        <li><Link to="/" className="logo"> <i class="fas fa-chess-board"></i> Chess</Link></li>
                        <li><Link to="/learn" className="learn"> Learn</Link></li>
                        <li><Link to="/play" className="play"> Play</Link></li>
                        <li><Link to="/about-us" className="about-us"> About Us</Link></li>
                    </ul>
                </div>
                <div className="header-right">
                    <div className="sign-container">
                        <Link to="/login" className="signin"> Sign in</Link>
                        <Link to="/signup" className="signup"> Sign up</Link>
                    </div>
                </div>
            </div>


        </nav>
    );
}

export default Header;