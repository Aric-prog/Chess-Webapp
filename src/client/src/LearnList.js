import { useState } from 'react';

const LearnList = () => {

    const [pieces, setPieces] = useState([
        {
            name: 'King',
            icon: 'fas fa-chess-king',
            image2: '',
            description: 'lorem ipsum..... lorem ipsum',
        },
        {
            name: 'Queen',
            icon: 'fas fa-chess-queen',
            image2: '',
            description: 'lorem ipsum..... lorem ipsum',
        },
        {
            name: 'Rook',
            icon: 'fas fa-chess-rook',
            image2: '',
            description: 'lorem ipsum..... lorem ipsum',
        },
        {
            name: 'Knight',
            icon: 'fas fa-chess-knight',
            image2: '',
            description: 'lorem ipsum..... lorem ipsum',
        },
        {
            name: 'Bishop',
            icon: 'fas fa-chess-bishop',
            image2: '',
            description: 'lorem ipsum..... lorem ipsum',
        },
        {
            name: 'Pawn',
            icon: 'fas fa-chess-pawn',
            image2: '',
            description: 'lorem ipsum..... lorem ipsum',
        }
    ]);

    return (
        <div className="rules-wrapper">
            <div className="container">
                <h1>The Rules Of Chess</h1>
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