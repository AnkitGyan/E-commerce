// routes/productsRoute.js
import express from 'express';
import { getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct } from '../controllers/productsController.js';
import { roleBasedAccess, veryifyUser } from '../middlewares/userAuth.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getSingleProduct);
router.post("/product/new", veryifyUser, roleBasedAccess("admin"), addProduct);
router.put("/product/:id", veryifyUser, roleBasedAccess("admin"), updateProduct);
router.delete("/product/:id",veryifyUser, roleBasedAccess("admin"), deleteProduct);

export default router;
