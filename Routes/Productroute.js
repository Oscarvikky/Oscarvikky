const express = require("express");
const {
  createProduct,
  fetch,
  editproduct,
  Delete,
  newcollection,
  popular_in_Women,
} = require("../Controller/Productcontroller");

const router = express.Router();

router.post("/uploadProduct", createProduct);
router.get("/fetchProduct", fetch);
router.post("/editproduct", editproduct);
router.delete("/deleteproduct", Delete);
router.get("/newcollection", newcollection);
router.get("/popularinwomen", popular_in_Women);

module.exports = router;
