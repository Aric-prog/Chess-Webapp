import chessintro from './images/chessintro.png';
import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import PlayRemindModal from './PlayRemindModal';
import SignUpModal from './SignUpModal';
import LoginModal from './LoginModal';
import { useAuth } from './firebase/AuthContext';
import ForgotPasswordModal from './ForgotPasswordModal';

const Home = () => {

    const [showLogin, setShowLogin] = useState(false);
    const [showRemind, setShowRemind] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showResetPass, setShowResetPass] = useState(false);
    const { currentUser } = useAuth()

    const openRemind = () => {
        setShowRemind(prev => !prev);
    }

    return (
        <div className="big-wrapper">
            <div className="container">
                <div className="content-wrapper">
                    <div className="home-content-left">
                        <div className="text-wrapper">
                            <h1>Chess is officially an e-sport</h1>
                            <h3>Don't have a board? Play chess online here for free! Compete with strangers or friends alike to test your skills!</h3>
                        </div>
                        <div className="btn-wrapper">
                            {(currentUser == null) && <a href="#" className="home-btn-play" onClick={openRemind}>Play now</a>}
                            {(currentUser != null) && <Link to="/playoption" className="home-btn-play"> Play now</Link>}
                            <Link to="/learn" className="home-btn-learn"> Learn about chess</Link>
                        </div>

                    </div>
                    <div className="home-content-right">
                        <img src={chessintro} alt="chess" className="chess-intro" />
                    </div>

                </div>

            </div>
            <PlayRemindModal showRemind={showRemind} setShowRemind={setShowRemind} showLogin={showLogin} setShowLogin={setShowLogin}></PlayRemindModal>
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} showSignUp={showSignUp} setShowSignUp={setShowSignUp} showResetPass={showResetPass} setShowResetPass={setShowResetPass}></LoginModal>
            <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} showLogin={showLogin} setShowLogin={setShowLogin}></SignUpModal>
            <ForgotPasswordModal showResetPass={showResetPass} setShowResetPass={setShowResetPass} showLogin={showLogin} setShowLogin={setShowLogin}></ForgotPasswordModal>

        </div>


    );
}

export default Home;