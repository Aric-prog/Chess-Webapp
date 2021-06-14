import '../node_modules/font-awesome/css/font-awesome.min.css';
import React, { useRef, useState, useEffect, useCallback } from 'react';
import { useSpring, animated } from 'react-spring';


const PlayRemindModal = ({ showLogin, setShowLogin, showRemind, setShowRemind }) => {

    const modalRef = useRef()
    const animation = useSpring({
        config: {
            duration: 400
        },
        opacity: showRemind ? 1 : 0,
        transform: showRemind ? 'translateY(57%)' : 'translateY(-100%)'
    })

    const openLogin = () => {
        setShowLogin(prev => !prev);
    };

    const openRemind = () => {
        setShowRemind(prev => !prev);
    };

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowRemind(false);
        }
    }

    const onEscapePressed = useCallback(
        e => {
            if (e.key === 'Escape' && showRemind) {
                setShowRemind(false)
            }
        }, [setShowRemind, showRemind]);

    useEffect(() => {
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    return (
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

export default PlayRemindModal;