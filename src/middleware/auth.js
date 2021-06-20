const admin = require("./admin");

// authentication middleware to check if JWT is legitimate or not
function authenticated(req, res, next){
    const headerToken = req.headers.authorization;
    if(!headerToken){
        return res.send({message : "No token provided"}).status(401);
    }

    if(headerToken && headerToken.split(" ")[0] !== "Bearer"){
        res.send({message : "Invalid token"}).status(401);
    }

    const token = headerToken.split(" ")[1];
    
    // use previously initialized admin account to verify token
    admin
        .auth()
        .verifyIdToken(token)
        .then((decodedToken) => {
            res.locals.uid = decodedToken.uid;
            next()
        })
        .catch((error) => res.send({message : error}).status(403));
    
}

module.exports = authenticated;