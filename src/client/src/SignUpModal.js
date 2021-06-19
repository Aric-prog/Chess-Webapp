// imports
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useAuth } from './firebase/AuthContext';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';

// the Sign Up modal
// SignUpModal component declared functionally
const SignUpModal = ({ showSignUp, setShowSignUp, showLogin, setShowLogin }) => {

    // set constants
    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const usernameRef = useRef()
    const { signup, currentUser } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const emailRegEx = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;


    // handle sign up form submission
    async function handleSubmit(e) {
        e.preventDefault()

        // check if password is in correct format
        if (!emailRef.current.value.match(emailRegEx)) {
            return setError('Invalid email format')
        }
        // check if password is atleast 6 length
        if (passwordRef.current.value.length < 6) {
            return setError('Password should be at least 6 characters')
        }

        // check if confirmPassword field is the same as password field
        if (passwordRef.current.value !==
            confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            // call signup function from firebase
            await signup(emailRef.current.value, passwordRef.current.value,
                usernameRef.current.value)
            alert('Signed up successfully')
            setError('')
            openSignUp()

        } catch {
            setError('Failed to create an account')
        }
        setLoading(false)

    }

    // to open sign up modal
    const openSignUp = () => {
        setShowSignUp(prev => !prev);
    };

    // to open log in modal
    const openLogin = () => {
        setShowLogin(prev => !prev);
    };

    const modalRef = useRef()

    // set animation for modal
    const animation = useSpring({
        config: {
            duration: 400
        },
        opacity: showSignUp ? 1 : 0,
        transform: showSignUp ? 'translateY(30%)' : 'translateY(-100%)'
    })

    // to close modal
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowSignUp(false);
        }
    }

    // if press escape key
    const onEscapePressed = useCallback(
        e => {
            if (e.key === 'Escape' && showSignUp) {
                setShowSignUp(false)
            }
        }, [setShowSignUp, showSignUp]);

    // do after render
    useEffect(() => {
        // detect escape key press
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    return (
        // html code
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

// export SignUpModal
export default SignUpModal;