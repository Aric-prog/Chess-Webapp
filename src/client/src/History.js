import { useEffect, useState } from "react";
import { useAuth } from './firebase/AuthContext';
const History = () => {
    const { currentUser } = useAuth()
    const [historyData, setHistoryData] = useState([])

    // Gets the history data for someone
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
                            console.log(data.history)
                            setHistoryData(data.history) //data.history array of objects
                        }
                    )
            );
        }
    }, [])

    return (
        <div className="big-wrapper">
            <div className="container">
                <div className="history-wrapper">
                    <div className="profile-wrapper">
                        {/* Profile Box here */}
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
                            {historyData.map(row => <tr>
                                {
                                    <> 
                                    <td>{row.enemy}</td>
                                    <td>{row.result}</td>
                                    <td>{row.side}</td>
                                    </>
                                }
                                </tr>)}
                        </tbody>
                    </table>
                </div>
            </div>
        </div>
    );
}

export default History;