const express=require("express")
const { connect } = require("./utils/db")
const cors=require("cors")
const { product } = require("./routes/productroute")
const { userroute } = require("./routes/userroute")

require("dotenv").config()
const port=process.env.port || 1414
const app=express()
app.use(express.json())
app.use(cors())

app.get("/",(req,res)=>{
    res.send("home page")
})

app.use("/product",product)
app.use("/user",userroute)













app.listen(port,async()=>{
    try {
        await connect
        console.log("db is connecetd")
    } catch (error) {
        console.log(error)
    }
    console.log(`server is running at ${port}`)
})