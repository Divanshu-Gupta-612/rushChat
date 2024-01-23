const jwt = require('jsonwebtoken');
const sKey = "asd78astdasd6atsyqs";

const verifyAuth = async(req, res, next)=>{
    const token  = req.headers['authorization'];
    try{
        const accesstoken = token.split(' ')[1];
        if(accesstoken){
            jwt.verify(token,sKey, (err, decoded)=>{
                if(err){
                    return res.status(401).json({msg: "Invalid Token"});
                }
                next();
            });
        }else{
            return res.status(404).json({msg: "Token is not found "});
        }
    }catch(err){
        return res.json({msg: err.message});
    }
}

module.exports = verifyAuth;