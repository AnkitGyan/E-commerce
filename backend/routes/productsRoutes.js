// routes/productsRoute.js
import express from 'express';
import { getAllProducts, getSingleProduct } from '../controllers/productsController.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product', getSingleProduct);

export default router;
