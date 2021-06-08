import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useAuth } from './firebase/AuthContext';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

const SignUpModal = ({ showSignUp, setShowSignUp, showLogin, setShowLogin }) => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const usernameRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;



    async function handleSubmit(e) {
        e.preventDefault()

        if (!emailRef.current.value.match(emailRegEx)) {
            return setError('Invalid email format')
        }

        if (passwordRef.current.value.length < 6) {
            return setError('Password should be at least 6 characters')
        }

        if (passwordRef.current.value !==
            confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value,
                usernameRef.current.value)
            setShowSignUp(prev => !prev)

        } catch {
            return setError('Failed to create an account')
        }
        setLoading(false)

    }

    const openSignUp = () => {
        setShowSignUp(prev => !prev);
    };

    const openLogin = () => {
        setShowLogin(prev => !prev);
    };

    const modalRef = useRef()
    const animation = useSpring({
        config: {
            duration: 1000
        },
        opacity: showSignUp ? 1 : 0,
        transform: showSignUp ? 'translateY(30%)' : 'translateY(-100%)'
    })

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowSignUp(false);
        }
    }

    const onEscapePressed = useCallback(
        e => {
            if (e.key === 'Escape' && showSignUp) {
                setShowSignUp(false)
            }
        }, [setShowSignUp, showSignUp]);

    useEffect(() => {
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    return (
        <div>
            {showSignUp ?
                <div className="modal" ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <div className="modal-inner">
                            <i class="far fa-times-circle" onClick={openSignUp}></i>
                            <div className="modal-header">
                                <h1>Sign Up</h1>
                            </div>
                            <form onSubmit={handleSubmit} action="" className="form-container">
                                <input type="text" ref={emailRef} placeholder="&#xf199;  Email address" required />
                                <input type="text" ref={usernameRef} placeholder="&#xF007;  Username" required />
                                <input type="password" ref={passwordRef} placeholder="&#xF023;  Password" required />
                                <input type="password" ref={confirmPasswordRef} placeholder="&#xf01e;  Confirm Password" required />
                                {error && <div className="form-error">{error}</div>}
                                <button type="submit" value="Login">SIGN UP</button>
                            </form>

                            <p>Already have an account? <Link className="modal-signup" onClick={() => {
                                openSignUp();
                                openLogin();
                            }}> Sign in now!</Link></p>
                        </div>
                    </animated.div>

                </div> : null}
        </div>

        // document.getElementById('portal')
    );
}

export default SignUpModal;