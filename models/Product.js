import mongoose from "mongoose";

const productSchema=new mongoose.Schema({
    title:{
        type:String,
        required:true
    },
    type:{
        type:String,
        required:true
    },
    size:{
        type:String,
        required:true
    },
    category:{
        type:String,
        required:true
    },
    price:{
        type:Number,
        required:true
    },
    discount:{
        type:Number
    },
    images:{
        type:[String]
    },
    desc:{
        type:String,
        required:true
    },
    rating:{
        type:Number
    }
},{
    timestamps:true
})

export default mongoose.model("Product",productSchema)