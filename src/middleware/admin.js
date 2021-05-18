const admin = require("firebase-admin");
const credentials = require("./credentials.json");

var serviceAccount = require("path/to/serviceAccountKey.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chess-web-app-13362-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = admin;