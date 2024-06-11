import mongoose, { mongo } from "mongoose";

const categorySchema=new mongoose.Schema({
      catname:{
        type:String,
        required:true
      },
      catImg:{
        type:String,
      },
      minPrice:{
        type:Number,
        required:true
      },
      maxPrice:{
        type:Number,
        required:true
      },
      keyword:{
        type:String,
        required:true
      }
})

export default mongoose.model("Category",categorySchema)