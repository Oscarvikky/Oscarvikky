const express = require("express")
const router = express.Router()

const {signup, login, EditAcc, Delete, getCurrentUser} = require("../Controller/Usercontroller")
const verifyToken = require("../Middleware/VerifyToken")


router.post("/sign-up", signup)
router.post("/login", login) 
router.post("/editProfile", verifyToken, EditAcc)
router.delete("/delete", verifyToken, Delete)
router.get("/currentUser",  getCurrentUser)



module.exports = router