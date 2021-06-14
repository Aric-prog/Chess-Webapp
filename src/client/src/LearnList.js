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
            click: 'Click me to learn more',
            description: 'The king is not the most powerful chess piece, but it is the most important one! If a king is put in checkmate, then the game is over! ',
            moveImage: kingMove
        },
        {
            name: 'Queen',
            icon: 'fas fa-chess-queen',
            click: 'Click me to learn more',
            description: 'The queen is the most powerful of all of the chess pieces and is often used in early and brutal attacks. It is important to learn how to make your opponent fear your dangerous queen!',
            moveImage: queenMove
        },
        {
            name: 'Rook',
            icon: 'fas fa-chess-rook',
            click: 'Click me to learn more',
            description: 'The rook is the second most powerful piece in chess! It is a long-range piece and is notorious for delivering back-rank checkmates!',
            moveImage: rookMove
        },
        {
            name: 'Knight',
            icon: 'fas fa-chess-knight',
            click: 'Click me to learn more',
            description: 'The knight is the trickiest piece in chess! It moves very differently than other pieces and can deliver the dreaded fork or even a smothered mate!',
            moveImage: knightMove
        },
        {
            name: 'Bishop',
            icon: 'fas fa-chess-bishop',
            click: 'Click me to learn more',
            description: 'The bishop is an interesting piece because it can move as far as it wants but only on diagonals. It is a long-range piece and can be very dangerous! ',
            moveImage: bishopMove
        },
        {
            name: 'Pawn',
            icon: 'fas fa-chess-pawn',
            click: 'Click me to learn more',
            description: 'The pawn is the least powerful chess piece, but it can be promoted into any other chess piece (except for a king). As Philidor once said, "Pawns are the soul of chess!"',
            moveImage: pawnMove
        }
    ]);

    return (
        <div className="big-wrapper">
            <div className="container">
                <h1 class="rules-title">The Rules Of Chess</h1>
                <div className="piece-container">
                    {pieces.map((piece) => (
                    <LearnModal 
                        name={piece.name}
                        icon={piece.icon}
                        click={piece.click}
                        description={piece.description}
                        moveImage={piece.moveImage}
                    ></LearnModal>
                ))}
                </div>
                
            </div>

        </div>

    );
}

export default LearnList;