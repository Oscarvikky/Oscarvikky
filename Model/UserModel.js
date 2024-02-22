const mongoose = require("mongoose")

const UserSchema = new mongoose.Schema({
    FullName: {type: String, required: [true, "Full is required"]},
    Email: {type: String, required: [true, "Email is required"], unique:[true, "Email already in use"]},
    Password: {type: String, required: true, minlegnth : [6, "passwrd must oass 6"] }
},
{timestamps : true}

)
const UserModel = mongoose.model("UserModel", UserSchema)
module.exports = UserModel





















