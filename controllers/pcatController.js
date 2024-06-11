import Category from "../models/Category.js";


//for create category
export const createCategory=async (req,res,next)=>{
    const newCat=new Category(req.body)
    try{
      const savedCategory=await newCat.save()
      res.status(200).json(savedCategory)
    }catch(err){
       next(err);
    }
}


//for get all category
export const getAllCategory=async (req,res,next)=>{
    try{
      const getcategory=await Category.find()
      res.status(200).json(getcategory)
    }catch(err){
        next(err);
    }
}


//for get only one category
export const getOneCategory=async (req,res,next)=>{
    try{
      const getone=await Category.findById(req.params.id)
      res.status(200).json(getone)
    }catch(err){
        next(err);
    }
}