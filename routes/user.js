import express from "express";
import { changeCartItem, checkMobileNo, createReview, decreaseCartQnt, deleteCart, deleteReview, deleteUser, getAddress, getAllCartItems, getAllUsers, getOneUser, increaseCartQnt, sendOtp, updateAddress, updateUser, verifyOtp } from "../controllers/userController.js";
import { verifyAdmin, verifyUser } from "../utils/verifyToken.js";

const router=express.Router()


//for update user
router.put('/:id',verifyUser,updateUser)

//for delete user
router.delete('/:id',verifyUser,deleteUser)

//for getting one user data
router.get('/:id',verifyUser,getOneUser)

//for fetching all user data
router.get('/',verifyAdmin,getAllUsers)

//for check mobile no
router.post('/mobile',verifyUser,checkMobileNo)


//for cart crud operation
//creating new cart item
router.post('/cart/:id',changeCartItem)

//increase cart qty
router.put('/cart/inc/:id/:productId',verifyUser,increaseCartQnt)

//decrease cart qty
router.put('/cart/dec/:id/:productId',verifyUser,decreaseCartQnt)

//delete cart item
router.delete('/cart/:id/:productId',verifyUser,deleteCart)

//get all cart item
router.get('/cart/:id',getAllCartItems)


//create review
router.post('/review/:id/',createReview)

//delete review
router.delete('/review/:id/:productId',deleteReview)


//for otp send
router.post('/sendotp',sendOtp)

router.post('/verifyotp',verifyOtp)

//for getting user address

router.get('/getaddress/:id',verifyUser,getAddress)


router.post('/updateaddress/:id',verifyUser,updateAddress)

export default router