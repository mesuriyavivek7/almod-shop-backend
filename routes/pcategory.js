import express from "express";

const router=express.Router()

import { createCategory, getAllCategory, getOneCategory } from "../controllers/pcatController.js";

//crud operation of category

//create new category
router.post('/',createCategory)

//get all category
router.get('/',getAllCategory)

//get one category
router.get('/:id',getOneCategory)

export default router