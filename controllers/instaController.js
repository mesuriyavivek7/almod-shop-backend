import Insta from "../models/Insta.js"


export const uploadPost=async (req,res,next)=>{
    const newPost=new Insta(req.body)
    try{
      const savedPost=await newPost.save()
      res.status(200).json(savedPost)
    }catch(err){
      next(err)
    }
}

export const getPosts=async (req,res,next)=>{
    try{
      const getAllPosts=await Insta.find()
      res.status(200).json(getAllPosts)
    }catch(err){
        next(err)
    }
}