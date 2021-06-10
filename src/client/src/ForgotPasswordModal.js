import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useAuth } from './firebase/AuthContext';
import { Link } from 'react-router-dom';

const ForgotPasswordModal = ({ showLogin, setShowLogin, showResetPass, setShowResetPass }) => {

    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)


    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            await resetPassword(emailRef.current.value)
            alert('Check your email for further instructions')
            setError('')
            openResetPass();
        } catch {
            return setError('Please enter a registered email')
        }
        setLoading(false)
    }

    const modalRef = useRef()
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showResetPass ? 1 : 0,
        transform: showResetPass ? 'translateY(55%)' : 'translateY(-100%)'
    })

    const openResetPass = () => {
        setShowResetPass(prev => !prev);
    };

    const closeModal = e => {
        if(modalRef.current === e.target){
            setShowResetPass(false);
        }
    }

    const onEscapePressed = useCallback(
        e => {
        if(e.key === 'Escape' && showResetPass){
            setShowResetPass(false)
        }
    }, [setShowResetPass, showResetPass]);

    useEffect(() => {
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    return (  
        <div>
            {showResetPass ?
                <div className="modal" ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <div className="modal-inner">
                            <i class="far fa-times-circle" onClick={openResetPass}></i>
                            <div className="modal-header">
                                <h1>Reset Password</h1>
                            </div>
                            <form onSubmit={handleSubmit} action="" className="form-container">
                                <input type="text" ref={emailRef} placeholder="&#xF007;  Email address" required />
                                {error && <div className="form-error">{error}</div>}
                                <button disabled={loading} type="submit" value="ResetPassword" className="reset-pass-btn">Reset Password</button>
                            </form>
                        </div>
                    </animated.div>
                </div> : null}


        </div>
    );
}
 
export default ForgotPasswordModal;