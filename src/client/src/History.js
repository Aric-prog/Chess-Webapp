// imports
import { useEffect, useState } from "react";
import { useAuth } from './firebase/AuthContext';
import { db } from './firebase/firebase-config';
import { Link } from 'react-router-dom'

// the History page
// History component declared functionally
const History = () => {
    // set constants
    const { currentUser } = useAuth()
    const [historyData, setHistoryData] = useState([])
    const [username, setUsername] = useState('')
    const historyDataIsEmpty = historyData === "No data"
    const historyDataLength = historyDataIsEmpty ? 0 : historyData.length
    var wincount = 0;

    // after render, gets the history data for someone
    useEffect(() => {
        if (currentUser !== null) {
            const token = currentUser.getIdToken().then(token =>
                // To be replace with api.chess-webapp.com in deployment
                fetch('https://api.chess-webapp.com/user/history', {
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
                            console.log(data.history)  // data is an object that has the history property which
                            // contains array of objects
                            setHistoryData(data.history) //data.history array of objects
                        }
                    )
            );
        }
    }, [])

    // do after render 
    useEffect(() => {
        // set username
        if (currentUser !== null) {
            db.collection('users').doc(currentUser.uid).get().then(doc => {
                return setUsername(doc.data().username)
            })
        }
    }, [])

    // count the wins of user
    function countWins(){
        historyData.map(data => {
            if (data.result === "W") {
                wincount += 1
            }
            else {
                wincount += 0
            }
        })
    return wincount
    }

    // calculate result and winrate
    const result = historyDataIsEmpty ? 0 : countWins()
    const winRate = historyDataIsEmpty ? 0 : (result / historyDataLength) * 100

    return (
        // html code
        <div className="big-wrapper">
            <div className="container">
                <div className="history-wrapper">

                    <div className="profile-wrapper">
                        <h1>My Profile</h1>
                        <div className="stats-wrapper">
                            <div><i class="fas fa-chess-board"></i></div>
                            <div>
                                <h3>Welcome {username}!</h3>
                                <p className="games-played">Games played: {historyDataLength}</p>
                                <p className="win-rate">Win rate: {winRate}%</p>
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
                            {!historyDataIsEmpty ? historyData.map(row => <tr>
                                {
                                    <>
                                        <td>{row.enemy}</td>
                                        <td>{row.result}</td>
                                        <td>{row.side}</td>
                                    </>
                                }
                            </tr>) : null}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

// export History
export default History;