const mongoose = require('mongoose');

function creating_Schema(){
    const userSchema = new mongoose.Schema({
        email : {
            type : String,
            unique : true,
            required : true,
        },
        userName : {
            type : String,
            unique : true,
            required : true,
        },
        password : {
            type : String,
            required : true,
        },
        accessToken :{
            type : String,
            required : true,
        }
    })
    return userSchema;
}

function userModelFunction(){
    return usermodel = new mongoose.model('users', creating_Schema());
}

module.exports = userModelFunction();