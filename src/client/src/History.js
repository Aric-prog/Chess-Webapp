import { useEffect, useState } from "react";
import { useAuth } from './firebase/AuthContext';
import { db } from './firebase/firebase-config';
import { Link } from 'react-router-dom'
const History = () => {
    const { currentUser } = useAuth()
    const [historyData, setHistoryData] = useState([])
    const [username, setUsername] = useState('')
    const [wins, setWins] = useState(0)

    // Gets the history data for someone
    useEffect(() => {
        if (currentUser !== null) {
            const token = currentUser.getIdToken().then(token =>
                // To be replace with api.chess-webapp.com in deployment
                fetch('http://localhost:5000/user/history', {
                    method: 'GET',
                    headers: {
                        authorization: 'Bearer ' + token
                    }
                })
                    .then(res => res.json())
                    .then(
                        // List from firebase is here, use it as you will
                        data => {
                            console.log(data)
                            console.log(data.history)
                            setHistoryData(data.history) //data.history array of objects
                        }
                    )
            );
        }
    }, [])

    useEffect(() => {
        if (currentUser !== null) {
            db.collection('users').doc(currentUser.uid).get().then(doc => {
                return setUsername(doc.data().username)
            })
        }
    }, [])


    // const result = historyData.map(data => {
    //     if (data.result === "W") {
    //         setWins(wins + 1)
    //     }
    //     else {
    //         setWins(wins + 0)
    //     }
    //     return wins
    // })


    // function getWins(){
    //     var i;
    //     for (i = 0; i < historyData.length; i++){
    //         const wins = historyData[i].result 
    //         if(wins === "W"){
    //             setWins(wins + 1)
    //         }
    //         else{
    //             setWins(wins + 0)
    //         }
    //         console.log(wins)
    //     }
    //     return wins
    // }

    return (
        <div className="big-wrapper">
            <div className="container">
                <div className="history-wrapper">

                    <div className="profile-wrapper">
                        <h1>My Profile</h1>
                        <div className="stats-wrapper">
                            <div><i class="fas fa-chess-board"></i></div>
                            <div>
                                <h3>Welcome {username}!</h3>
                                <p className="games-played">Games played: {historyData.length}</p>
                                <p className="win-rate">Win rate:</p>
                            </div>
                        </div>

                    </div>
                    <h1>Match History</h1>
                    <table className="history-table">
                        <thead>
                            <tr>
                                <th>Enemy</th>
                                <th>Result</th>
                                <th>Side</th>
                            </tr>
                        </thead>
                        <tbody> 
                            {/* {historyData.length && historyData.map(row => <tr>
                                {
                                    <>
                                        <td>{row.enemy}</td>
                                        <td>{row.result}</td>
                                        <td>{row.side}</td>
                                    </>
                                }
                            </tr>)} */}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default History;