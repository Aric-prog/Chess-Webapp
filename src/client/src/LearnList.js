import { useState } from 'react';
import pawnMove from './images/pawnmove.png'
import kingMove from './images/kingmove.png'
import queenMove from './images/queenmove.png'
import knightMove from './images/knightmove.png'
import bishopMove from './images/bishopmove.png'
import rookMove from './images/rookmove.png'
import LearnModal from './LearnModal';

const LearnList = () => {

    const [pieces, setPieces] = useState([
        {
            name: 'King',
            icon: 'fas fa-chess-king',
            image2: '',
            description: 'Click me to learn more',
        },
        {
            name: 'Queen',
            icon: 'fas fa-chess-queen',
            image2: '',
            description: 'Click me to learn more',
        },
        {
            name: 'Rook',
            icon: 'fas fa-chess-rook',
            image2: '',
            description: 'Click me to learn more',
        },
        {
            name: 'Knight',
            icon: 'fas fa-chess-knight',
            image2: '',
            description: 'Click me to learn more',
        },
        {
            name: 'Bishop',
            icon: 'fas fa-chess-bishop',
            image2: '',
            description: 'Click me to learn more',
        },
        {
            name: 'Pawn',
            icon: 'fas fa-chess-pawn',
            image2: '',
            description: 'Click me to learn more',
        }
    ]);

    const pieceDescriptionList = [
        {
            description: 'The king is not the most powerful chess piece, but it is the most important one! If a king is put in checkmate, then the game is over! ',
            moveImage: kingMove
        },
        {
            description: 'The king is not the most powerful chess piece, but it is the most important one! If a king is put in checkmate, then the game is over! ',
            moveImage: queenMove
        },
        {
            description: 'The king is not the most powerful chess piece, but it is the most important one! If a king is put in checkmate, then the game is over! ',
            moveImage: rookMove
        },
        {
            description: 'The king is not the most powerful chess piece, but it is the most important one! If a king is put in checkmate, then the game is over! ',
            moveImage: bishopMove
        },
        {
            description: 'The king is not the most powerful chess piece, but it is the most important one! If a king is put in checkmate, then the game is over! ',
            moveImage: knightMove
        },
        {
            description: 'The king is not the most powerful chess piece, but it is the most important one! If a king is put in checkmate, then the game is over! ',
            moveImage: pawnMove
        }
    ]

    const [showModal, setShowModal] = useState(false);

    const openModal = () => {
        setShowModal(prev => !prev);
    };


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
            {/* <LearnModal showModal={showModal} setShowModal={setShowModal}></LearnModal> */}
        </div>
        
    );
}

export default LearnList;