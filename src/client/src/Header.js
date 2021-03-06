// imports
import React, { useState, useEffect } from 'react';
import LoginModal from './LoginModal';
import { Link, useHistory } from 'react-router-dom';
import SignUpModal from './SignUpModal';
import { useAuth } from './firebase/AuthContext';
import { db } from './firebase/firebase-config';
import ForgotPasswordModal from './ForgotPasswordModal';
import PlayRemindModal from './PlayRemindModal';

// the header
// Header component declared functionally
const Header = () => {

    // set constants
    const [showLogin, setShowLogin] = useState(false);
    const [showSignUp, setShowSignUp] = useState(false);
    const [showResetPass, setShowResetPass] = useState(false);
    const [showRemind, setShowRemind] = useState(false);
    const { signout, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const [username, setUsername] = useState('')
    const history = useHistory()

    // handle sign out from firebase auth
    async function handleSignOut(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            // call signout function
            await signout()
            history.push('/')
        } catch {
            return setError('Failed to signout')
        }
        setLoading(false)
    }

    // to open login modal
    const openLogin = () => {
        setShowLogin(prev => !prev);
    };

    // to open sign up modal
    const openSignUp = () => {
        setShowSignUp(prev => !prev);
    };

    // to open remind modal
    const openRemind = () => {
        setShowRemind(prev => !prev);
    }

    // do after render 
    useEffect(() => {
        // set username on header
        if(currentUser !== null){
            db.collection('users').doc(currentUser.uid).get().then(doc => {
                return setUsername(doc.data().username)
            })
        }
        console.log(username)
    })
    
    // const checkPlay = currentUser !== null ?

    return (
        // html code
        <nav className="navbar">
            <div className="container">
                <div className="header-left">
                    <ul className="header-left-list">
                        <li><Link to="/" className="logo"> <i class="fas fa-chess-board"></i> Chess</Link></li>
                        <li><Link to="/learn" className="learn"> Learn</Link></li>
                        {(currentUser==null) && <li><a href="#" className="play" onClick={openRemind}>Play</a></li>}
                        {(currentUser!=null) && <li><Link to="/playoption" className="play"> Play</Link></li>}
                        <li><Link to="/about" className="about-us"> About Us</Link></li>
                    </ul>
                </div>
                <div className="header-right">
                    <div className="sign-container">
                        {(currentUser==null) && <Link className="signin" onClick={openLogin}> Login</Link>}
                        {(currentUser==null) && <Link className="signup" onClick={openSignUp}> Sign up</Link>}
                        {(currentUser!=null) && <Link to="/history" className="signin"> { username } </Link>}
                        {(currentUser!=null) && <Link to="/" className="signup" onClick={handleSignOut}> 
                            Logout</Link>}
                    </div>
                </div>
            </div>
            <LoginModal showLogin={showLogin} setShowLogin={setShowLogin} showSignUp={showSignUp} setShowSignUp={setShowSignUp} showResetPass={showResetPass} setShowResetPass={setShowResetPass}></LoginModal>
            <SignUpModal showSignUp={showSignUp} setShowSignUp={setShowSignUp} showLogin={showLogin} setShowLogin={setShowLogin}></SignUpModal>
            <ForgotPasswordModal showResetPass={showResetPass} setShowResetPass={setShowResetPass} showLogin={showLogin} setShowLogin={setShowLogin}></ForgotPasswordModal>
            <PlayRemindModal showRemind={showRemind} setShowRemind={setShowRemind} showLogin={showLogin} setShowLogin={setShowLogin}></PlayRemindModal>

        </nav>
    );
}

// export Header
export default Header;
