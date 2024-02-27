const express = require("express")
const router = express.Router()

const {signup, login, EditAcc, Delete, getCurrentUser} = require("../Controller/Usercontroller")
const verifyToken = require("../Middleware/VerifyToken")
const { validateMiddleware } = require("../Middleware/Validator")
const { validateUserSignUp } = require("../Middleware/Uservalidate")


router.post("/sign-up", validateMiddleware(validateUserSignUp), signup)
router.post("/login", login) 
router.post("/editProfile", verifyToken, EditAcc)
router.delete("/delete", verifyToken, Delete)
router.get("/currentUser", verifyToken,  getCurrentUser)



module.exports = router