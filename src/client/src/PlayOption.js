import { Link } from 'react-router-dom';
import selectPlayer from './images/selectPlayer.png'
import selectPlayerSVG from './images/selectPlayer.svg'
import selectPlayerColored from './images/selectPlayerColored.svg'

const PlayOption = () => {
    return (
        <div className="big-wrapper">
            <div className="container">
                <div className="playOption-content-wrapper">
                    <h1 className="rules-title">Choose your opponent!</h1>
                    <img className="selectPlayer" src={selectPlayerColored}></img>
                    <div className="option-container">
                        <Link to="/play" className="option">
                            <div>
                                <p>PLAYER</p>
                                <p>VS</p>
                                <p>PLAYER</p>
                            </div>
                        </Link>
                        <Link to="/playnoobai" className="option">
                            <div>
                                <p>PLAYER</p>
                                <p>VS</p>
                                <p>NOOB AI</p>
                            </div>
                        </Link>
                        <Link to="/playproai" className="option">
                            <div>
                                <p>PLAYER</p>
                                <p>VS</p>
                                <p>PRO AI</p>
                            </div>
                        </Link>
                    </div>
                </div>

            </div>
        </div>
    );
}

export default PlayOption;