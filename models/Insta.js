import mongoose from "mongoose";

const instaSchema= new mongoose.Schema({
      postImage:{
        type:String,
        required:true
      },
      postLink:{
        type:String,
        required:true
      }
})

export default mongoose.model("Insta",instaSchema)