const mongoose=require("mongoose")

const productSchema=mongoose.Schema({
    name:String,
    price:Number,
    color:String,
    image1:String,
    image2:String,
    image3:String,
    image4:String,
    maincat:String,
    subcat:String,
    description:String
})

const productmodel=mongoose.model("productdata",productSchema)

module.exports={
    productmodel
}