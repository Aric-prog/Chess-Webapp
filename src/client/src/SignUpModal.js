import React, { useRef, useState } from 'react';
import { useAuth } from './firebase/AuthContext';
import { Link } from 'react-router-dom';
import { useSpring, animated } from 'react-spring';
import ReactDom from 'react-dom'

const SignUpModal = ({showSignUp, setShowSignUp}) => {

    const emailRef = useRef()
    const passwordRef = useRef()
    const confirmPasswordRef = useRef()
    const usernameRef = useRef()
    const { signup } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)
    const linkTemp = "#";

    async function handleSubmit(e) {
        e.preventDefault()

        if (passwordRef.current.value !==
            confirmPasswordRef.current.value) {
            return setError('Passwords do not match')
        }

        try {
            setError('')
            setLoading(true)
            await signup(emailRef.current.value, passwordRef.current.value,
                usernameRef.current.value)
            setShowSignUp(prev => !prev);
        } catch {
            return setError('Failed to create an acount')
        }
        setLoading(false)

    }

    const closeSignUp = () => {
        setShowSignUp(prev => !prev);
    };

    return (
        <div>
            {showSignUp ? 
            <div className="modal">
            <div className="modal-inner">
                <i class="far fa-times-circle" onClick={() => setShowSignUp(prev => !prev)}></i>
                <div className="modal-header">
                    <h1>Sign Up</h1>
                </div>
                <form onSubmit={handleSubmit, closeSignUp} action="" className="form-container">
                    <input type="text" ref={emailRef} placeholder="&#xf199;  Email address" required />
                    <input type="text" ref={usernameRef} placeholder="&#xF007;  Username" required />
                    <input type="password" ref={passwordRef} placeholder="&#xF023;  Password" required />
                    <input type="password" ref={confirmPasswordRef} placeholder="&#xf01e;  Confirm Password" required />
                    {error && <div className="confirmPasswordError">{error}</div>} {/* <- font needs to be changed */}
                    <button type="submit" value="Login">SIGN UP</button>
                </form>

                <p>Already have an account? <Link className="modal-signup" onClick={() => setShowSignUp(prev => !prev)}> Sign in now!</Link></p>
            </div>
        </div> : null}
        </div>
        
        // document.getElementById('portal')
    );
}

export default SignUpModal;