import express from "express"

//importing controllers
import { payNow, validatePayment } from "../controllers/paymentController.js"

const router=express.Router()


router.post('/paynow',payNow)

router.post('/validatepayment',validatePayment)

export default router