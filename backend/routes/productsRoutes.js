// routes/productsRoute.js
import express from 'express';
import { getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } from '../controllers/productsController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getSingleProduct);
router.post("/product/new", addProduct);
router.put("/product/:id", updateProduct);
router.delete("/product/:id", deleteProduct);

export default router;
