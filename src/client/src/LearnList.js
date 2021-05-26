import { useState } from 'react';

const LearnList = (props) => {

    const pieces = props.pieces;
    
    return (
        <div className="big-wrapper">
            <div className="container">
                <h1 class="rules-title">The Rules Of Chess</h1>
                <div className="piece-container">
                    {pieces.map((piece) => (
                        <div className="piece">
                            <i className={piece.icon}></i>
                            <h1>{piece.name}</h1>
                            <p>{piece.description}</p>
                        </div>
                    ))}
                </div>
            </div>
        </div>
    );
}

export default LearnList;