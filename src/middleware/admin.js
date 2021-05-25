const admin = require("firebase-admin");
var serviceAccount = require("../service_account.json");

admin.initializeApp({
  credential: admin.credential.cert(serviceAccount),
  databaseURL: "https://chess-web-app-13362-default-rtdb.asia-southeast1.firebasedatabase.app"
});

module.exports = admin;