const jwt = require('jsonwebtoken');
const sKey = "asd78astdasd6atsyqs";

function jwtTokenGen({userName, email}){
    return jwt.sign({
            uid : userName,
            email : email,
        },
        sKey
    );
} 


module.exports = {
    jwtTokenGen
}