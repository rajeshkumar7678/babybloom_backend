const express=require("express")
const bcrypt=require("bcrypt")
const jwt=require("jsonwebtoken")
const { productmodel } = require("../model/productmodel")
const { middleware } = require("../middleware/auth")
const { usermodel } = require("../model/usermodel")

const product=express.Router()

product.get("/",async(req,res)=>{
    try {
        let products=await productmodel.find()
        res.send({"products":products})
    } catch (error) {
        res.send(error)
    }
    
})

product.post("/adminlogin",async(req,res)=>{
    let {email,password}=req.body
       
    try {
        let data=await usermodel.findOne({email})
        console.log(data)
        console.log(data.role)
        if(data.role!=="admin"){
            return res.send({"msg":"not Authorised to loogin as admin "})
        }
        
        if(data){
            bcrypt.compare(password, data.password, (err, result)=> {
                if(result){
                    res.status(200).send({"msg":`login sucessfull`,"name":data.name,"token":jwt.sign({"userid":data._id ,"role":data.role}, 'rajesh',{expiresIn:"1hr"})})
                }else{
                    res.status(400).send({"msg":"password incorrect"})
                }
            });
        } else{
            res.send("uer not found")
        }      
    } catch (error) {
        console.log(error)
        res.status(400).send({"msg":error})
        
    }
})

product.post("/add", middleware, async (req,res)=>{
    try {
       let payload=req.body
       let product=new productmodel(payload)
       await product.save()
       res.status(200).send({"msg":"product added successfull"})
        
        
    } catch (error) {
        res.send(error)
    }
   
})

product.put("/update/:id", middleware, async (req,res)=>{
    try {
       let payload=req.body
       let {id}=req.params
       await productmodel.findByIdAndUpdate({_id:id},payload)
       res.status(200).send({"msg":"product update successfull"})
        
        
    } catch (error) {
        res.send(error)
    }
   
})

product.delete("/delete/:id",async(req,res)=>{
    try {
        let {id}=req.params
        await productmodel.findByIdAndDelete({_id:id})
        res.status(200).send({"msg":"product deleted"})

    } catch (error) {
        res.send(error)
    }
})





module.exports={
    product
}