const express = require("express");
const router = express.Router();

const {
  signup,
  login,
  EditAcc,
  Delete,
  getCurrentUser,
  addtocart,
  getuser,
} = require("../Controller/Usercontroller");
const verifyToken = require("../Middleware/VerifyToken");
const { validateMiddleware } = require("../Middleware/Validator");
const { validateUserSignUp } = require("../Middleware/Uservalidate");

router.post("/sign-up", validateMiddleware(validateUserSignUp), signup);
router.post("/login", login);
router.post("/editProfile", verifyToken, EditAcc);
router.delete("/delete", verifyToken, Delete);
router.get("/currentUser", verifyToken, getCurrentUser);
router.post("/addtocart", verifyToken, addtocart);
router.post("/getuser", verifyToken, getuser);

module.exports = router;
