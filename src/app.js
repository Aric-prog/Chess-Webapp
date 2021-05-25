const http = require('http');
const express = require('express');
const path = require('path');
const session = require('express-session');
const cors = require('cors')

const app = express()
const server = http.createServer(app)
const { Server } = require("socket.io");
const io = new Server(server);

app.use(express.static(path.join(__dirname, '/')))

const PORT = process.env.PORT || 5000;

var routes = require('./api/routes.js')

app.use(cors())
app.use('/', routes.play)
require("./middleware/socket.js")(io);
app.use(
    session({
        secret : "super secret key",
        resave : false,
        saveUninitialized : false,
    })
)
server.listen(PORT)

