import firebase from 'firebase/app'
import "firebase/auth"
import "firebase/firestore"

const app = firebase.initializeApp({
    apiKey: "AIzaSyAZxggMXIvqjwX3ZbMU4lGWuPHOZ8WpuKo",
    authDomain: "chess-web-app-13362.firebaseapp.com",
    databaseURL: "https://chess-web-app-13362-default-rtdb.asia-southeast1.firebasedatabase.app",
    projectId: "chess-web-app-13362",
    storageBucket: "chess-web-app-13362.appspot.com",
    messagingSenderId: "443371880514",
    appId: "1:443371880514:web:6cc7d5cdaf9900a0286ddb",
    measurementId: "G-NE0KNCLLVS"
}) 

export const auth = app.auth()
export const db = app.firestore()
export default app