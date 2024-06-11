import Users from "../models/Users.js";

import bcrypt from "bcrypt"

import { error } from "../utils/error.js";
import jwt from "jsonwebtoken"

//register conhtroller

export const register=async (req,res,next)=>{
    const salt=bcrypt.genSaltSync(10)
    const hash=bcrypt.hashSync(req.body.password,salt)
    try{
        const isemailavailable=await Users.find({email:req.body.email})
        if(isemailavailable.length===0){
            const newuser=await Users({
                ...req.body,
                password:hash
            })
            await newuser.save()
            res.status(200).json("new user created successfully")
        }else{
            return next(error(500,"Email address is already exists...!"))
        }
        

    }catch(err){
        next(err)
    }
}

//login for user

export const login=async (req,res,next)=>{
    try{
        const user=await Users.findOne({email:req.body.email})
        if(!user){
            return next(error(404,"User not found by this email address"))
        }
        const isPasswordCorrect=await bcrypt.compare(req.body.password,user.password)
        if(!isPasswordCorrect){
            return next(error(404,"Password is not correct"))
        }
        const token=jwt.sign({id:user._id,isAdmin:user.isAdmin},process.env.JWT)
        const {password,isAdmin,...otherDetails}=user._doc
        res.cookie("access_token",token,{httpOnly:false,}).status(200).json({details:{...otherDetails},isAdmin})
    }catch(err){
        next(err)
    }
}
