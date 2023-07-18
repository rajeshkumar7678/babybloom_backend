const jwt=require("jsonwebtoken")

const middleware=async (req,res,next)=>{
    let token=req.headers.token
    //console.log(token)
    if(!token){
        return res.send({"msg":"login first"})
    }
    let decoded=jwt.verify(token,"rajesh")
    if(!decoded){
        res.send({"msg":"login first"})
    }
    if(decoded.role=="user"){
        return res.send({"msg":"not authorised"})
    }
    req.id=decoded.userid
    
    
    next()
}


module.exports={
    middleware
}