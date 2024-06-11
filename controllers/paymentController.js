import Razorpay from 'razorpay'
import dotenv from "dotenv"
import crypto from "crypto"
import { error } from '../utils/error.js'

dotenv.config()

export const payNow= async(req,res,next)=>{
    try{
        const razorpay=new Razorpay(
            {
              key_id:process.env.RAZORPAY_ID_KEY,
              key_secret:process.env.RAZORPAY_SECRET_KEY
            }
        )

        const option=req.body
        const order=await razorpay.orders.create(option)

        if(!order){
             return next(error(500,"there is something wrong....!"))
        }

        return res.status(200).json(order)
      
    }catch(err){
        next(err)
    }
}

export const validatePayment=(req,res,next)=>{
      const {razorpay_order_id,razorpay_payment_id,razorpay_signature}=req.body
      try{
         const sha=crypto.createHmac("sha256",process.env.RAZORPAY_SECRET_KEY)
         sha.update(`${razorpay_order_id}|${razorpay_payment_id}`)
         const digest=sha.digest("hex")
         if(digest!==razorpay_signature){
            return next(error(400,"Transaction Failed...!"))
         }

         return res.status(200).json({msg:'success',order_id:razorpay_order_id,payment_id:razorpay_payment_id})
      }catch(err){
        next(err)
      }
}