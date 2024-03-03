const express = require('express');
const http = require('http');
const database_connectivity = require('./config/dbconfig');
const cors = require('cors');
const { Server } = require('socket.io');
require('dotenv').config();
// const response = require('@google/generative-ai')

const app = express();
const server = http.createServer(app);

//Global Middleware
app.use(express.json());
app.use(cors());

const io = new Server(server);

const userRouter = require('./routes/users.routes');
const runChat = require('./AI/AIChat');
const chat = require('./AI/AIChat');
app.use('/auth/user', userRouter);

database_connectivity(process.env.MongoDBuRL);

// ----------------------------------------- socket io logic d---------------------------------------- 

let custom_rooms = {}

io.on('connection', (socket) => {
    console.log('User connected');

    // Get list of rooms
    // socket.join('room1')
    const id = socket.id.substring(0, 4);

    socket.broadcast.emit('id', socket.id)
    socket.emit("customRooms", custom_rooms)

    socket.on('msgSent', async (room, msg) => {
        if (room === 'AI') {
            const res = await runChat(msg)
            // console.log("res: ", res);
            socket.emit('receiveMsg', { id: 'AI', msg: res });
        }else{
            // console.log(room, msg);
            socket.to(room).emit('receiveMsg', { id: id, msg: msg });
        }
    })

    socket.on('createRoom', (msg) => {
        if (custom_rooms[msg] === undefined) {
            custom_rooms[msg] = true;
        }
        let rooms = io.sockets.adapter.rooms;
        console.log("custom_rooms: ", custom_rooms)
        console.log("a rooms: ", rooms)
        io.emit("customRooms", custom_rooms)
    })

    socket.on('joinRoom', (prevRoom, currentRoom) => {
        if (prevRoom !== '') {
            socket.leave(prevRoom);
        }
        console.log(prevRoom, currentRoom);
        if (currentRoom !== 'AI') {
            socket.join(currentRoom);
        }
        let rooms = io.sockets.adapter.rooms;
        console.log("j rooms: ", rooms)
    })

    socket.on('disconnect', (msg) => {
        console.log('User disconnected');
    })
})

server.listen(process.env.PORT, () => {
    console.log("The server is Running on http://localhost:" + process.env.PORT);
})
