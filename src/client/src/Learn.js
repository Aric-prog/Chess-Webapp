import { useState } from 'react'
import LearnList from './LearnList';

const Learn = () => {

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
        <LearnList pieces={pieces}></LearnList>
    );
}

export default Learn;