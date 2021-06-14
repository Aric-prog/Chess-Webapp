import chessintro from './images/chessintro.png';
import { Link } from 'react-router-dom';
const Home = () => {

    return (
        <div className="big-wrapper">
            <div className="container">
                <div className="content-wrapper">
                    <div className="home-content-left">
                        <div className="text-wrapper">
                            <h1>Chess is officially an e-sport</h1>
                            <h3>Don't have a board? Play chess online here for free! Compete with strangers or friends alike to test your skills!</h3>
                        </div>
                        <div className="btn-wrapper">
                            <Link to="/play" className="home-btn-play"> Play now</Link>
                            <Link to="/learn" className="home-btn-learn"> Learn about chess</Link>
                        </div>

                    </div>
                    <div className="home-content-right">
                        <img src={chessintro} alt="chess" className="chess-intro" />
                    </div>

                </div>

            </div>
        </div>


    );
}

export default Home;