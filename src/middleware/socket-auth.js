const admin = require("./admin");

// same function as auth.js except modified to fit with socket.io
// used when players do operations that require authentication (e.g. making a room)
function auth(socket, next) {
    headerToken = socket.handshake.headers.authorization;
    if(!headerToken){
        err = new Error("No Token provided");
        next(err);
    }
    
    if(headerToken.split(" ")[0] !== "Bearer"){
        err = new Error("Invalid token");
        next(err);
    }
    const token = headerToken.split(" ")[1];
    admin.auth()
        .verifyIdToken(token)
        .then(decodedToken => {
            socket.uid = decodedToken.uid
            next()
        })
        .catch(() => next(new Error("Could not authenticate")));
}

module.exports = auth;