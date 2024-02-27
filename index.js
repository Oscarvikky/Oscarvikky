 const express = require("express")
const connectDb = require("./Config/dbConnnect")
 const app = express()
 const env = require("dotenv").config()
 const UserRouter = require("./Routes/UserRoute")
 const productRoute = require("./Routes/Productroute")
 const cors= require("cors")
const ErrorHandler = require("./Middleware/ErrorHandler")



 app.use(express.json())
 app.use(express.urlencoded({extended:true}))
 app.use(cors({origin: "*"}))
 app.use(ErrorHandler)

//  console.log("working free")
 connectDb()
 app.use("/Api/Users", UserRouter )
 app.use("/Api/Products", productRoute )
  const port = process.env.PORT || 4000
app.listen(port,()=>{
  console.log(`app running on port ${port}`)
})