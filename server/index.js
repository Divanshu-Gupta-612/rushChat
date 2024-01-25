const express = require('express');
const http = require('http');
const database_connectivity = require('./config/dbconfig');
const cors = require('cors');
const {Server} = require('socket.io');
require('dotenv').config();

const app = express();
const server = http.createServer(app);

//Global Middleware
app.use(express.json());
app.use(cors());

const io = new Server(server);

const userRouter = require('./routes/users.routes');
app.use('/auth/user', userRouter);

database_connectivity(process.env.MongoDBuRL);

// ----------------------------------------- socket io logic d---------------------------------------- 

io.on('connection',(socket)=>{
    
})

server.listen(process.env.PORT, ()=>{
    console.log("The server is Running on http://localhost:"+process.env.PORT);
})
