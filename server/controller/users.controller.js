const userModel = require('../model/users.model');
const bcrypt = require('bcrypt');
const {jwtTokenGen} = require('../service/jwtgenrator');

const userRegistration = async(req, res)=>{
    try{
        const {userName, password, email} = req.body;
        const userExist = await userModel.findOne({email:email});
        if(userExist){
            return res.status(409).json({msg: "User allready Exist", userDetail : userExist});
        }
        
        const hashPass = await bcrypt.hash(password, 10);
        const accessToken = jwtTokenGen({userName, email});
        const user = new userModel({
            email,
            userName,
            password : hashPass,
            accessToken
        })

        const result = await user.save();
        res.status(200).json({msg : "User is SucessFull register", userDetail : result});

    }catch(err){
        console.log("This error msg from the userController.js ", err);
        res.json({msg:err.message});
    }
};

const userLogin = async(req, res)=>{
    try{
        const {email, password} = req.body;
        const userExist = await userModel.findOne({email:email}); 
        if(!userExist){
            return res.status(404).json({msg: "User does'nt exist"}); // throw this error and catch on the catch function
        }
        const passwordMatch = await bcrypt.compare(password,userExist.password); 

        if(passwordMatch){
            return res.json({msg:"User is login sucessFull"});
        }
        throw new Error({message:"Incorrect Password", passwordMatch});
    }catch(err){
        return res.json({msg: err.message});
    }
};

module.exports = {
    userRegistration,
    userLogin
}

