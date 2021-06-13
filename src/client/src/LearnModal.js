import { useSpring, animated } from 'react-spring';
import React, { useRef, useState, useEffect, useCallback } from 'react';

const LearnModal = (showModal, setShowModal) => {

    const modalRef = useRef()
    const animation = useSpring({
        config: {
            duration: 400
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? 'translateY(35%)' : 'translateY(-100%)'
    })

    const openModal = () => {
        setShowModal(prev => !prev);
    };

    const closeModal = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    const onEscapePressed = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false)
            }
        }, [setShowModal, showModal]);

    useEffect(() => {
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    let modal;
    // showModal ? modal = (

    // ): modal = null
    if (showModal) {
        modal = (
            <div className="modal" ref={modalRef} onClick={closeModal}>
                <animated.div style={animation}>
                    <div className="modal-inner">
                        <i class="far fa-times-circle" onClick={openModal}></i>
                        <div className="modal-header">
                            <h1>Login</h1>
                        </div>
                    </div>
                </animated.div>
            </div>
        )
    }


    return (
        <div>
            {showModal ?
                <div className="modal" ref={modalRef} onClick={closeModal}>
                    <animated.div style={animation}>
                        <div className="modal-inner">
                            <i class="far fa-times-circle" onClick={openModal}></i>
                            <div className="modal-header">
                                <h1>Login</h1>
                            </div>
                        </div>
                    </animated.div>
                </div> : null}
        </div>
    );
}

export default LearnModal;