// imports
import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useAuth } from './firebase/AuthContext';
import { Link, useHistory } from 'react-router-dom';

// the Login modal
// LoginModal component declared functionally
const LoginModal = ({ showLogin, setShowLogin, showSignUp , setShowSignUp, showResetPass, setShowResetPass }) => {

    // set constants
    const emailRef = useRef()
    const passwordRef = useRef()
    const { signin } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const history = useHistory()

    const modalRef = useRef()
    // set animation
    const animation = useSpring({
        config: {
            duration: 400
        },
        opacity: showLogin ? 1 : 0,
        transform: showLogin ? 'translateY(35%)' : 'translateY(-100%)'
    })

    // to open login modal
    const openLogin = () => {
        setShowLogin(prev => !prev);
        setError('')
    };

    // to open sign up modal
    const openSignUp = () => {
        setShowSignUp(prev => !prev);
    };

    // to open reset password modal
    const openResetPass = () => {
        setShowResetPass(prev => !prev);
        console.log(showLogin)
        console.log(showResetPass)
    };

    // to clode modal
    const closeModal = e => {
        if(modalRef.current === e.target){
            setShowLogin(false);
            setError('')
        }
    }

    // if press escape key
    const onEscapePressed = useCallback(
        e => {
        if(e.key === 'Escape' && showLogin){
            setShowLogin(false)
        }
    }, [setShowLogin, showLogin]);

    // do after render
    useEffect(() => {
        // detect esc key press
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    // handle form submit for login
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            // call signin function from firebase
            await signin(emailRef.current.value, passwordRef.current.value)
            alert('Logged in successfully')
            setError('')
            openLogin();
            history.push('/')
        } catch {
            setError('Invalid email or password')
        }
        setLoading(false)
    }


    return (
        // html code
        <div>
            {showLogin ?
                <div className="modal" ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <div className="modal-inner">
                            <i class="far fa-times-circle" onClick={openLogin}></i>
                            <div className="modal-header">
                                <h1>Login</h1>
                            </div>
                            <form onSubmit={handleSubmit} action="" className="form-container">
                                <input type="text" ref={emailRef} placeholder="&#xF007;  Email address" required />
                                <input type="password" ref={passwordRef} placeholder="&#xF023;  Password" required />
                                {error && <div className="form-error">{error}</div>}
                                <Link to="/" className="forgot-password" onClick={() => {
                                    openLogin();
                                    openResetPass();
                                }}> Forgot password?</Link>
                                <button disabled={loading} type="submit" value="Login">LOGIN</button>
                            </form>
                            <p>Don't have an account? <Link className="modal-signup" onClick={() => {
                                openLogin();
                                openSignUp();
                            }}>Sign up now!</Link></p>
                        </div>
                    </animated.div>
                </div> : null}


        </div>



        // document.getElementById('portal')
    );
}

// export Login Modal
export default LoginModal;