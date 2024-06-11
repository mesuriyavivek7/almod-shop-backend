import express from "express"

import mongoose, { connect } from "mongoose"
import dotenv from "dotenv"

//importing routes
import authRoute from './routes/auth.js'
import userRoute from './routes/user.js'
import productRoute from './routes/products.js'
import paymentRoute from './routes/payment.js'
import instaRoute from './routes/insta.js'
import categoryRoute from './routes/pcategory.js'

import cookieParser from "cookie-parser"

dotenv.config()


const app=express()

//connecting to mongodb server

const connectDb=async ()=>{

    try{
       await mongoose.connect(process.env.MONGO)
       console.log("Connected to mongodb sucessfully")
    }catch(err){
       throw err
    }
}

app.get('/',(req,res)=>{
    res.send("Bahut Maja A raha hai🤓")
})

//to notify mongodb is connected or disconnected
mongoose.connection.on("connected",()=>{
    console.log("Mongodb connected sucessfully")
})

mongoose.connection.on("disconnected",()=>{
    console.log("Mongodb disconnected")
})

//by using this middleware we can easily fetch our data
app.use(express.json())
//middleware for read cookies data
app.use(cookieParser())

//middleware 
app.use('/api/auth',authRoute)
app.use('/api/user',userRoute)
app.use('/api/product',productRoute)
app.use('/api/payment',paymentRoute)
app.use('/api/insta',instaRoute)
app.use('/api/category',categoryRoute)

//middleware for catch error

app.use((err,req,res,next)=>{
   const errStatus=err.status || 500
   const errMsg=err.message || "Something went wrong!"

   return res.status(errStatus).json({
       success:'false',
       status:errStatus,
       message:errMsg,
       stack:err.stack
   })
})

app.listen(8080,()=>{
    connectDb()
    console.log("app is listented on port:8080")
})