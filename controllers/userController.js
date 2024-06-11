//importing modals
import Users from '../models/Users.js'
import OTP from '../models/OTP.js'

import otpgenerator from 'otp-generator'
import twilio from 'twilio'
import dotenv from "dotenv"

import { error } from '../utils/error.js'

import { otpValidate } from '../helper/otpValidate.js'

dotenv.config()

const accountSiD=process.env.TWILIO_ACCOUNT_SID
const authToken=process.env.TWILIO_AUTH_TOKEN

const client = new twilio(accountSiD, authToken);

export const updateUser=async (req,res,next)=>{
    try{
       const updateuser=await Users.findByIdAndUpdate(req.params.id,{$set:req.body})
       const finduser=await Users.findById(req.params.id)
       res.status(200).json(finduser)
    }catch(err){
        next(err)
    }
}

export const deleteUser=async (req,res,next)=>{
    try{
       await Users.findByIdAndDelete(req.params.id)
       res.status(200).json("User deleted sucessfully")
    }catch(err){
       next(err)
    }
}  


export const getOneUser=async (req,res,next)=>{
    try{
      const getoneuserdata=await Users.findById(req.params.id)
      res.status(200).json(getoneuserdata)
    }catch(err){
        next(err)
    }
}


export const getAllUsers=async (req,res,next)=>{
    try{
      const getuserdata=await Users.find()
      res.status(200).json(getuserdata)
    }catch(err){
        next(err)
    }
}


//for check mobile number is available or not

export const checkMobileNo=async (req,res,next)=>{
    try{
        const getmobileuser=await Users.find({mobileno:req.body.mobileno})
        if(getmobileuser.length!==0){
            res.status(200).josn(true)
        }else{
            res.status(200).json(false)
        }
    }catch(err){
        next(err)
    }
}


//cart controllers


//create new cart
export const changeCartItem=async (req,res,next)=>{
    const userid=req.params.id
    try{
        await Users.findByIdAndUpdate(userid,{$set:{cartItems:req.body}})
        res.status(200).json("cart Item Changed successfully")
    }catch(err){
        next(err)
    }
}

//increase cart qnt
export const increaseCartQnt=async (req,res,next)=>{
       const {fetchqnt}=req.query
       const userid=req.params.id
       const productId=req.params.productId
       try{
         await Users.findByIdAndUpdate(userid,{$set:{cartItems:{productId:productId,qnt:Number(fetchqnt)+1}}})
         res.status(200).json("cart qnt increase successfully")
       }catch(err){
          next(err)
       }
}

//decrease cart qnt
export const decreaseCartQnt=async (req,res,next)=>{
    const {fetchqnt}=req.query
    const userid=req.params.id
    const productid=req.params.productId
    try{
      await Users.findByIdAndUpdate(userid,{$set:{cartItems:{productId:productid,qnt:Number(fetchqnt)-1}}})
      res.status(200).json("cart qnt decrease successfully")
    }catch(err){
       next(err)
    }
}

//delete cart item

export const deleteCart=async (req,res,next)=>{
    const userid=req.params.id
    const productid=req.params.productId

    try{
        await Users.findByIdAndUpdate(userid,{$pull:{cartItems:{productId:productid}}})
        res.status(200).json("cart item deleted successfully")
    }catch(err){
        next(err)
    }
}

//fetch all cart items

export const getAllCartItems=async (req,res,next)=>{
    try{
        const getCartItems=await Users.find({_id:req.params.id},{cartItems:1,_id:0})
        res.status(200).json(getCartItems)
    }catch(err){
        next(err)
    }
}

//create review

export const createReview=async (req,res,next)=>{
    const userid=req.params.id

    try{
       await Users.findByIdAndUpdate(userid,{$push:{review:req.body}})
       res.status(200).json("Review added sucessfully")
    }catch(err){
        next(err)
    }
}

export const deleteReview=async (req,res,next)=>{
     const userid=req.params.id
     const productid=req.params.id
     try{
        await Users.findByIdAndUpdate(userid,{$pull:{review:{productId:productid}}})
     }catch(err){
        next(err)
     }
}

export const sendOtp=async (req,res,next)=>{
    try{
        const {phoneNumber,userId}=req.body
        const otp=otpgenerator.generate(4,{ lowerCaseAlphabets:false,upperCaseAlphabets: false, specialChars: false })
        const cDate=new Date();

        await OTP.findOneAndUpdate(
                {phoneNumber},
                {userId,otp,expiry:new Date(cDate.getTime())},
                {upsert:true,new:true,setDefaultsOnInsert:true}
        )

        await client.messages.create(
            {
                body:`${otp}`,
                to:phoneNumber,
                from:process.env.TWILIO_PHONE_NUMBER
            }
        )

        return res.status(200).json({
            success:true,
            msg:otp
        })
    }catch(err){
        next(err)
    }
}

export const verifyOtp=async (req,res,next)=>{
    try{
        const {phoneNumber,otp}=req.body

        const otpData=await OTP.findOne({
            phoneNumber,
            otp
        })

        if(!otpData){
           return next(error(401,"otp is incorrect"))
        }

        const isOtpExpired=await otpValidate(otpData.expiry)

        if(isOtpExpired){
            return next(error(402,"otp is expired"))
        }

        return res.status(200).json("Otp verification successfully")


    }catch(err){
       next(err)
    }
}

export const updateAddress=async (req,res,next)=>{
    try{
       await Users.findByIdAndUpdate(req.params.id,{$set:{address:req.body}})
       res.status(200).json("Address updated successfully")
    }catch(err){
      next(err)
    }
}

export const getAddress=async (req,res,next)=>{

    try{
      const addressData=await Users.find({_id:req.params.id},{address:1,_id:0})
    
      return res.status(200).json(addressData[0])
      
      
    }catch(err){
      next(err)
    }
}