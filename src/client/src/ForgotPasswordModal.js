// imports
import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';
import { useAuth } from './firebase/AuthContext';

// the modal for Forgot Password
// ForgotPasswordModal component declared functionally
const ForgotPasswordModal = ({ showLogin, setShowLogin, showResetPass, setShowResetPass }) => {

    // set constants
    const emailRef = useRef()
    const { resetPassword } = useAuth()
    const [error, setError] = useState('')
    const [loading, setLoading] = useState(false)

    // handle submission form
    async function handleSubmit(e) {
        e.preventDefault()
        try {
            setError('')
            setLoading(true)
            // call reset password function
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

    // animation for modal
    const animation = useSpring({
        config: {
            duration: 250
        },
        opacity: showResetPass ? 1 : 0,
        transform: showResetPass ? 'translateY(55%)' : 'translateY(-100%)'
    })

    // to open reset password modal
    const openResetPass = () => {
        setShowResetPass(prev => !prev);
    };
    
    // to close modal
    const closeModal = e => {
        if(modalRef.current === e.target){
            setShowResetPass(false);
        }
    }

    // if press escape key
    const onEscapePressed = useCallback(
        e => {
        if(e.key === 'Escape' && showResetPass){
            setShowResetPass(false)
        }
    }, [setShowResetPass, showResetPass]);

    // do after render
    useEffect(() => {
        // detect esc key press
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    return (  
        // html code
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

// export ForgotPasswordModal
export default ForgotPasswordModal;