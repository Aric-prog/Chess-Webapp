const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');

const app = express();
const server = http.createServer(app);
const io = require("socket.io")(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
    }
});

app.use(cors())
app.use(express.static(path.join(__dirname, '/')))

const PORT = process.env.PORT || 5000;

var routes = require('./api/routes.js')

app.use('/', routes.play)
require("./middleware/socket.js")(io);
app.use(
    session({
        secret : "super secret key",
        resave : false,
        saveUninitialized : false
    })
)
server.listen(PORT);

