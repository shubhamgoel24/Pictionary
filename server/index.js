require('dotenv').config();
const express = require('express');
const app = express();
const http = require('http');
const cookieParser = require('cookie-parser');
var cors = require('cors');
const passport = require('passport');
// const passportGoogle = require('./config/passport-google-oauth2-strategy');
const { Store } = require('express-session');
const db = require('./config/firebase');
// const db = require('./config/mongoose');
const session = require('express-session');
const fs = require('fs');
const server = http.createServer(app);
const io = require("socket.io")(server, 
    { 
    cors: {
        origin: "*"
    }
});
app.use(cors());
app.use(cookieParser());
io.on('connection', onConnection);
let host = false;
function onConnection(socket){
    console.log("Connection received ",socket.id);
    if(!host){
        host = socket.id;
        io.to(socket.id).emit('DrawOrNot');
    }
    
    socket.on('drawing', (data) => socket.broadcast.emit('drawing', data));
    socket.on('disconnect',()=>{
        if(socket.id === host)
            host = false
    })
}
app.use(express.urlencoded({ extended: true }));
app.use('/', require('./routes'));
const port = 5000;
server.listen(port, () => console.log(`server is running on port ${port}`));