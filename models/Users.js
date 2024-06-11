import mongoose from "mongoose";

const UserSchema=new mongoose.Schema({
    first_name:{
        type:String,
        required:true,
    },
    last_name:{
        type:String,
        required:true,
    },
    email:{
        type:String,
        required:true,
        unique:true,
    },
    mobileno:{
        type:String
    },
    verified:{
        type:Boolean,
        default:false
    },
    address:{
        flateno:String,
        apartment:String,
        locality:String,
        city:String,
        state:String,
        postcode:String,
        addresstype:String,
    },
    password:{
        type:String,
        required:true
    },
    cartItems:[{productId:String,qnt:Number,size:String}],
    review:[{productId:String,message:String,rating:Number,isDisplay:Boolean}],
    isAdmin:{
        type:Boolean,
        default:false,
    }
},{
    timestamps:true
})

//user is verified by its mobile number

export default mongoose.model("Users",UserSchema)