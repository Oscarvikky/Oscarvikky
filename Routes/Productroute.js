const express = require("express")
const { createProduct, fetch, editproduct, Delete } = require("../Controller/Productcontroller")

const router = express.Router()

router.post("/uploadProduct", createProduct)
router.get ("/fetchProduct", fetch)
router.post ("/editproduct", editproduct)
router.delete ("/deleteproduct", Delete)



module.exports = router