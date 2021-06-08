import { useEffect } from "react";
import { useAuth } from './firebase/AuthContext';
const History = () => {
    const { currentUser } = useAuth()
    // Gets the history data for someone
    useEffect(() => {
        if(currentUser !== null){
            const token = currentUser.getIdToken().then(token => 
                // To be replace with api.chess-webapp.com in deployment
                fetch('http://localhost:5000/user/history', {
                    method : 'GET',
                    headers:{
                        authorization : 'Bearer ' + token
                    }
                })
                .then(res => res.json())
                .then(
                    // List from firebase is here, use it as you will
                    data => {
                        console.log(data)
                    }
                )    
            );
        }
    }, [])

    return (  
        <div className="big-wrapper">
            <div className="container">
                <div className="history-wrapper">
                    lol
                </div>
            </div>
        </div>
    );
}
 
export default History;