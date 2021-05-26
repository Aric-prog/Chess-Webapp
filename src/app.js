const http = require('http');
const path = require('path');
const cors = require('cors');
const express = require('express');
const session = require('express-session');

const init_io = require("./middleware/socket.js");
const app = express();
const server = http.createServer(app);


app.use(cors())
app.use(express.static(path.join(__dirname, '/')))

const io = require("socket.io")(server, {
    cors:{
        origin: "http://localhost:3000",
        methods: ["GET","POST"],
        transports: ["websocket"]
    }
});
init_io(io)
const PORT = process.env.PORT || 5000;

var routes = require('./api/routes.js')

app.use('/', routes.play)
server.listen(PORT);

