const admin = require("firebase-admin");

// creates a service account initialized from a file
// the code will not compile without this file 
var serviceAccount = require("../service_account.json");

// initialize the firebase service account
admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chess-web-app-13362-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = admin;