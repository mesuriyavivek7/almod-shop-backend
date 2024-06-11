import express from "express"
import { login, register } from "../controllers/authController.js"

const router=express.Router()

//for registration new user

router.post('/register',register)
//for login new user

router.post('/login',login)

export default router

