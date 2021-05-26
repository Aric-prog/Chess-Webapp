const admin = require("./admin");

function auth(socket, next) {
    headerToken = socket.handshake.authorization;
    if(!headerToken){
        err = new Error("No Token provided");
        next(err);
    }

    if(headerToken && headerToken.split(" ")[0] !== "Bearer"){
        err = new Error("Invalid token");
        next(err);
    }

    const token = token.split(" ")[1];
    admin
        .auth()
        .verifyIdToken(token)
        .then(() => next())
        .catch(() => next(new Error("Could not authenticate")));
}

module.exports = auth;