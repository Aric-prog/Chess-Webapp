// imports
import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';

// the Remind Modal
// PlayRemindModal component declared functionally
const PlayRemindModal = ({ showLogin, setShowLogin, showRemind, setShowRemind }) => {
    // set constants
    const modalRef = useRef()

    // set animation
    const animation = useSpring({
        config: {
            duration: 400
        },
        opacity: showRemind ? 1 : 0,
        transform: showRemind ? 'translateY(57%)' : 'translateY(-100%)'
    })

    // to open login modal
    const openLogin = () => {
        setShowLogin(prev => !prev);
    };

    // to open remind modal
    const openRemind = () => {
        setShowRemind(prev => !prev);
    };

    // to close modal
    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowRemind(false);
        }
    }

    // if press escape key
    const onEscapePressed = useCallback(
        e => {
            if (e.key === 'Escape' && showRemind) {
                setShowRemind(false)
            }
        }, [setShowRemind, showRemind]);

    // do after render
    useEffect(() => {
        // detect esc key presses
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    return (
        // html code
        <div>
            {showRemind ?
                <div className="modal" ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <div className="modal-inner">
                            <i class="far fa-times-circle" onClick={openRemind}></i>
                            <div className="modal-header">
                                <h1 className="reminder-title">Reminder</h1>
                                <hr className="reminder-line" />
                                <p className="please-login">Please login or sign up first before playing the game</p>
                                <div className="reminder-btn-container">
                                    <button value="Login" className="remind-login-btn" onClick={() => {
                                        openRemind();
                                        openLogin();
                                    }}>Login</button>
                                    <button value="close" className="remind-login-btn" onClick={() => {
                                        openRemind();
                                    }}>Close</button>
                                </div>
                            </div>
                        </div>
                    </animated.div>
                </div> : null}
        </div>
    );
}

// export PlayRemindModal
export default PlayRemindModal;