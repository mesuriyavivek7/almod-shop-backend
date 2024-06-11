import express from "express"

//importing controllers
import { createProduct, deleteProduct, getOneProduct, getProducts, getProductsSearchBy, getTopProducts, getTotalPrice, updateProduct } from "../controllers/productController.js"
import { verifyAdmin } from "../utils/verifyToken.js"

const router=express.Router()



//for creating new product

router.post('/',verifyAdmin,createProduct)

//for updating new product

router.put('/:id',verifyAdmin,updateProduct)

//for delete prooduct
router.delete('/:id',verifyAdmin,deleteProduct)

//for getting one products
router.get("/find/:id",getOneProduct)

//for getting all products
router.get("/",getProducts)

//for getting products searchby
router.get("/searchby",getProductsSearchBy)

//for getting top products
router.get('/top',getTopProducts)

//for getting total price and total saving
router.post('/price',getTotalPrice)

export default router