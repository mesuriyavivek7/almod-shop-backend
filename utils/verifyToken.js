import jwt from 'jsonwebtoken'
import { error } from './error.js'



export const verifyToken=(req,res,next)=>{
    const token=req.cookies.access_token
    if(!token) return next(error(401,"you are not authorized"))

    jwt.verify(token,process.env.JWT,(err,user)=>{
        if(err){
            next(error(400,"Token is not valid"))
        }

        req.user=user
        next()
    })
}


export const verifyUser=(req,res,next)=>{
       verifyToken(req,res,next,()=>{
           if(req.user.id===req.params.id || req.user.isAdmin){
              next()
           }else{
              return next(error(403,"You are not authorized"))
           }
       })
}


export const verifyAdmin=(req,res,next)=>{
    verifyToken(req,res,next,()=>{
        if(req.user.isAdmin){
            next()
        }else{
            return next(error(403,"You are not admin"))
        }
    })
}

export const verifyCookie=(req,res,next)=>{
   
}