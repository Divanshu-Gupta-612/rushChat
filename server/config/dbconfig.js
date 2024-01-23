const mongoose = require('mongoose');


async function database_connectivity(url){

    mongoose.connect(url).then((res)=>{
        console.log("Database is Connected");
    }).catch((err)=>{
        console.log("There is a error while connecting ", err);
    })
}

export default database_connectivity;