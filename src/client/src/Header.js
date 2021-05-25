import { useState } from 'react';
import LoginModal from './LoginModal';
import { Link } from 'react-router-dom';
import SignUpModal from './SignUpModal';

const Header = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);

    return (
        <nav className="navbar">
            <div className="container">
                <div className="header-left">
                    <ul className="header-left-list">
                        <li><Link to="/" className="logo"> <i class="fas fa-chess-board"></i> Chess</Link></li>
                        <li><Link to="/learn" className="learn"> Learn</Link></li>
                        <li><Link to="/play" className="play"> Play</Link></li>
                        <li><Link to="/about" className="about-us"> About Us</Link></li>
                    </ul>
                </div>
                <div className="header-right">
                    <div className="sign-container">
                        <Link className="signin" onClick={() => {
                            setShowLogin(true);
                        }}> Sign in</Link>
                        <Link className="signup" onClick={() =>{
                            setShowSignUp(true);
                        }}> Sign up</Link>
                    </div>
                </div>
            </div>
            {showLogin && <LoginModal open={showLogin} onClose={() => setShowLogin(false)}></LoginModal>}
            {showSignUp && <SignUpModal open={showSignUp} onClose={() => setShowSignUp(false)}></SignUpModal>}


        </nav>
    );
}

export default Header;