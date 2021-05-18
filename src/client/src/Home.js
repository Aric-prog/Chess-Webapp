import chessintro from './images/chessintro.png';
const Home = () => {

    const linkTemp = '#';
    return (
        <div className="home-wrapper">
            <div className="container">
                <div className="content-wrapper">
                    <div className="home-content-left">
                        <div className="text-wrapper">
                            <h1>Chess is officially an e-sport (lol?)</h1>
                            <h3>Don't have a board? Play chess online here for free! Compete with strangers or friends alike to test your skills!</h3>
                        </div>
                        <div className="btn-wrapper">
                            <a href={linkTemp} className="home-btn-play">Play now</a>
                            <a href={linkTemp} className="home-btn-learn">Learn about chess</a>
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