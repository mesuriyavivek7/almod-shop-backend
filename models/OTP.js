import mongoose from "mongoose";


const otpSchema=new mongoose.Schema({

    userId:{
        type:String,
        required:true
    },
    phoneNumber:{
        type:String,
        required:true
    },
    otp:{
        type:String,
        required:true
    },
    expiry:{
        type:Date,
        default:Date.now,
        get:(expiry)=>expiry.getTime(),
        set:(expiry)=>new Date(expiry)
    }
})

export default mongoose.model("OTP",otpSchema)