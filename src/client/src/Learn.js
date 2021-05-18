// import pawn from './images/pawn.png'
// import king from './images/king.png'
// import queen from './images/queen.png'
// import bishop from './images/bishop.png'
// import rook from './images/rook.png'
// import knight from './images/knight.png'
const Learn = () => {

    return (
        <div className="rules-wrapper">
            <div className="container">
                <h1>The Rules Of Chess</h1>
                <div className="piece-container">
                    <div className="piece king">
                        <i class="fas fa-chess-king"></i>
                        <h1>King</h1>
                    </div>
                    <div className="piece queen">
                        <i class="fas fa-chess-queen"></i>
                        <h1>Queen</h1>
                    </div>
                    <div className="piece rook">
                        <i class="fas fa-chess-rook"></i>
                        <h1>Rook</h1>
                    </div>
                    <div className="piece knight">
                        <i class="fas fa-chess-knight"></i>
                        <h1>Knight</h1>
                    </div>
                    <div className="piece bishop">
                        <i class="fas fa-chess-bishop"></i>
                        <h1>Bishop</h1>
                    </div>
                    <div className="piece pawn">
                        <i class="fas fa-chess-pawn"></i>
                        <h1>Pawn</h1>
                    </div>
                </div>
            </div>
        </div>
    );
}

export default Learn;