import express from "express";

//importing controller
import { getPosts, uploadPost } from "../controllers/instaController.js";

const router=express.Router();

//for posting instagram post
router.post('/upload',uploadPost)

//for getting all insta post
router.get('/getpost',getPosts)




export default router
