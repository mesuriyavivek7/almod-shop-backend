import Product from "../models/Product.js";

import { searchProduct } from "../helper/searchProduct.js";

export const createProduct=async (req,res,next)=>{
    const newProduct=new Product(req.body)
    try{
        const savedProduct=await newProduct.save()
        res.status(200).json(savedProduct)
    }catch(err){
        next(err)
    }
}


export const updateProduct=async (req,res,next)=>{
    try{
      const updateproduct=await Product.findByIdAndUpdate(req.params.id,{$set:req.body})
      res.status(200).json(updateproduct)
    }catch(err){
        next(err)
    }
}

export const deleteProduct=async (req,res,next)=>{
    try{
      const deleteproduct=await Product.findByIdAndDelete(req.params.id)
      res.status(200).json("Product deleted sucessfully")
    }catch(err){
        next(err)
    }
}

export const getOneProduct=async (req,res,next)=>{
    try{
       const getproduct=await Product.findById(req.params.id)
       res.status(200).json(getproduct)
    }catch(err){
        next(err)
    }
}


export const getProducts=async (req,res,next)=>{
    let {min,max,keyword,size,limit,...others}=req.query
    if(keyword==='none'){
        keyword=undefined
    }

    if(size==='none'){
        size=undefined
    }

    try{
      let getproducts=await Product.find({...others,$or:[{size:size || '350gm'},{size:size || '850gm'},{size:size || '1250gm'}],price:{$gte:min || 1,$lte:max || 10000}}).limit(limit)
      if(keyword!==undefined){
         getproducts=searchProduct(keyword,getproducts)
      }
      res.status(200).json(getproducts)
    }catch(err){
        next(err)
    }
}

export const getProductsSearchBy=async (req,res,next)=>{

    let {keyword,limit}=req.query

    try{
       if(keyword===''){
         keyword=undefined
       }
       limit=parseInt(limit,10)

       let searchproductsdata=await Product.find();
       searchproductsdata=searchProduct(keyword,searchproductsdata,limit)
       res.status(200).json(searchproductsdata)
    }catch(err){
        next(err)
    }

}

export const getTopProducts=async (req,res,next)=>{
     try{
        const fetchtopproducts=await Product.find().limit(8)
        res.status(200).json(fetchtopproducts)
     }catch(err){
        next(err)
     }
}

export const getTotalPrice=async (req,res,next)=>{
    let cartitems=req.body.cartitems
    console.log(cartitems)
    let totalPrice=0
    let totalSaving=0
    try{
       for(let i=0;i<cartitems.length;i++){
          let pitem=await Product.findById(cartitems[i].productId)
          let orgPrice=pitem.price
          let saving=0
          if(pitem.discount!==0){
                saving=Math.floor((orgPrice*pitem.discount)/100)
                orgPrice=orgPrice-saving   
          }
          totalPrice+=(orgPrice*cartitems[i].qnt)
          totalSaving+=(saving*cartitems[i].qnt)
       }
       console.log(totalPrice,totalSaving)
       res.status(200).json({totalPrice,totalSaving})
    }catch(err){
        next(err)
    }
}

