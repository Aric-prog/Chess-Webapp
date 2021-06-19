// imports
import { useSpring, animated } from 'react-spring';
import React, { useRef, useState, useEffect, useCallback } from 'react';

// the Learn Modal
// LearnModal component declared functionally
const LearnModal = (props) => {

    // set constants
    const [showModal, setShowModal] = useState(false);
    const modalRef = useRef()

    // animation for modal
    const animation = useSpring({
        config: {
            duration: 400
        },
        opacity: showModal ? 1 : 0,
        transform: showModal ? 'translateY(35%)' : 'translateY(-100%)'
    })

    // to open modal
    const openModal = () => {
        setShowModal(true);
    };

    // to close modal 
    const closeModal = () => {
        setShowModal(false);
    }

    const closeModalExit = e => {
        if (modalRef.current === e.target) {
            setShowModal(false);
        }
    }

    // if press escape key
    const onEscapePressed = useCallback(
        e => {
            if (e.key === 'Escape' && showModal) {
                setShowModal(false)
            }
        }, [setShowModal, showModal]);

    // do after render
    useEffect(() => {
        // detect esc key press
        document.addEventListener('keydown', onEscapePressed);
        return () => document.removeEventListener('keydown', onEscapePressed)
    }, [onEscapePressed]);

    let modal;

    // display image, descriptions of pieces in the modal
    if (showModal) {
        modal = (
            <div className="modal-learn" ref={modalRef} onClick={closeModalExit}>
                <animated.div style={animation}>
                    <div className="modal-inner-learn">
                        <i id="close" class="far fa-times-circle" onClick={closeModal}></i>
                        <div className="modal-header-learn">
                            <i className={props.icon}></i>
                            <h1>{props.name}</h1>
                        </div>
                        <div className="learnModal-content">
                            <img src={props.moveImage}></img>
                            <p>{props.description}</p>
                        </div>
                        
                    </div>
                </animated.div>
            </div>
        )
    }

    // the piece button
    return (
        <div className="piece" >
            <div onClick={openModal}>
                <i className={props.icon}></i>
                <h1>{props.name}</h1>
                <p>{props.click}</p>
            </div>
            {modal}
        </div>



    );
}

// export LearnModal
export default LearnModal;