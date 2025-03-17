const mongoose = require("mongoose");
const { object } = require("yup");

const UserSchema = new mongoose.Schema(
  {
    FullName: { type: String, required: [true, "Full is required"] },
    Email: {
      type: String,
      required: [true, "Email is required"],
      unique: [true, "Email already in use"],
    },
    Password: {
      type: String,
      required: true,
      minlegnth: [6, "passwrd must pass 6"],
    },
    CartData: { type: Object, default: {} },
  },
  { timestamps: true }
);
const UserModel = mongoose.model("UserModel", UserSchema);
module.exports = UserModel;
