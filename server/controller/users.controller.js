const userModel = require('../model/users.model');

const userRegistration = async((req, res)=>{
    return res.json({data: "msg done registration"})
})

const userLogin = async((req, res)=>{
    return res.json({data: "msg  done login "})
})

