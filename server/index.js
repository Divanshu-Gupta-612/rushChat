
const express = require('express');
const http = require('http');
const database_connectivity = require('./config/dbconfig');
const cors = require('cors');
require('dotenv').config();

const app = express();

//Global Middleware
app.use(express.json());
app.use(cors());

const userRouter = require('./routes/users.routes');
app.use('/auth/user', userRouter);

database_connectivity(process.env.MongoDBuRL);

app.listen(process.env.PORT, ()=>{
    console.log("The server is Running on http://localhost:"+process.env.PORT);
})
