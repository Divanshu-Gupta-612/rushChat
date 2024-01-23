const express = require('express');
const http = require('http');
const database_connectivity = require('./config/dbconfig');
const PORT = 8000;
const cors = require('cors');
const app = express();

app.use(express.json());
app.use(cors());

database_connectivity();

app.listen(PORT, ()=>{
    console.log("The server is Running on http://localhost:"+PORT);
})
