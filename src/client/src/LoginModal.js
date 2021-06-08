import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useAuth } from './firebase/AuthContext';
import { Link } from 'react-router-dom';

const LoginModal = ({ showLogin, setShowLogin, showSignUp , setShowSignUp }) => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const { signin } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const linkTemp = '#'


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await signin(emailRef.current.value, passwordRef.current.value)
        } catch {
            return setError('Invalid email or password')
        }
        setLoading(false)
    }

    // const [showSignUp, setShowSignUp] = useState(false);
    const modalRef = useRef()
    const animation = useSpring({
        config: {
            duration: 1000
        },
        opacity: showLogin ? 1 : 0,
        transform: showLogin ? 'translateY(35%)' : 'translateY(-100%)'
    })

    const openLogin = () => {
        setShowLogin(prev => !prev);
    };

    const openSignUp = () => {
        setShowSignUp(prev => !prev);
    };

    const closeModal = e => {
        if(modalRef.current === e.target){
            setShowLogin(false);
        }
    }

    const onEscapePressed = useCallback(
        e => {
        if(e.key === 'Escape' && showLogin){
            setShowLogin(false)
        }
    }, [setShowLogin, showLogin]);

    useEffect(() => {
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);


    return (
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
                                <a href={linkTemp} className="forgot-password">Forgot Password?</a>
                                {/* <Link to="/" className="signup" onClick={}> Forgot password?</Link> */}
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

export default LoginModal;