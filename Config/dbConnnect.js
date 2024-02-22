const mongoose = require("mongoose")

const connectDb = async() =>{
    connectionString = process.env.CONNECTINGSTRINGS;
    try {
       const connect = await mongoose.connect(connectionString)
       if(connect){
        console.log("e don connect")
       }else{
        console.log("cant connect");
       }
    } catch (error) {
        console.log("internal server error", error);
    }
}
module.exports = connectDb