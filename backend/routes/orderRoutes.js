import express from "express";
import {  allMyOrder, createOrder } from "../controllers/orderController.js";
import { roleBasedAccess, veryifyUser } from "../middlewares/userAuth.js";
const router = express.Router();


router.post("/order/new", veryifyUser, createOrder);
router.get("/orders/user", veryifyUser, allMyOrder)
router.get("/admin/order/:id", veryifyUser, roleBasedAccess("admin"), getSngleOrder);

export default router;