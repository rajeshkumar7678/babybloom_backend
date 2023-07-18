const mongoose=require("mongoose")

let userschema=mongoose.Schema({
    email:{ type : String, required : true, unique : true },
    name:{ type : String, required : true },
    password:{ type : String, required : true },
    mobilenumber:Number,
    role:{type:String,enum:["user","admin"],default:"user"}

})

const usermodel=mongoose.model("user",userschema)

module.exports={
    usermodel
}