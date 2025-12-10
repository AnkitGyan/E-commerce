// routes/productsRoute.js
import express from 'express';
import { getAllProducts, getSingleProduct, addProduct, updateProduct, deleteProduct, getAdminProducts } from '../controllers/productsController.js';
import { roleBasedAccess, veryifyUser } from '../middlewares/userAuth.js';

const router = express.Router();

router.get('/products', getAllProducts);
router.get('/product/:id', getSingleProduct);
router.get('/admin/products', veryifyUser, roleBasedAccess('admin'), getAdminProducts);
router.post("/admin/product/new", veryifyUser, roleBasedAccess("admin"), addProduct);
router.put("/admin/product/:id", veryifyUser, roleBasedAccess("admin"), updateProduct);
router.delete("/admin/product/:id",veryifyUser, roleBasedAccess("admin"), deleteProduct);

export default router;
