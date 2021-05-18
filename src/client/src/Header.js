import { useState } from 'react';

const Header = () => {

    const linkTemp = "#";


    return (
        <nav className="navbar">
            <div className="container">
                <div className="header-left">
                    <ul className="header-left-list">
                        <li><a href={linkTemp} className="logo" ><i class="fas fa-chess-board"></i> Chess</a></li>
                        <li ><a href={linkTemp} className="learn" >Learn</a></li>
                        <li ><a href={linkTemp} className="play" >Play</a></li>
                        <li ><a href={linkTemp} className="about-us" >About Us</a></li>
                    </ul>
                </div>
                <div className="header-right">
                    <div className="sign-container">
                        <a href={linkTemp} className="signin">Sign in</a>
                        <a href={linkTemp} className="signup">Sign up</a>    
                    </div>
                </div>
            </div>


        </nav>
    );
}

export default Header;