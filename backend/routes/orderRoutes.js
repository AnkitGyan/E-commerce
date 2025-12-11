import express from "express";
import {  allMyOrder, allOrders, createOrder, deleteOrder, orderStatus, getSingleOrder } from "../controllers/orderController.js";
import { roleBasedAccess, veryifyUser } from "../middlewares/userAuth.js";
const router = express.Router();


router.post("/order/new", veryifyUser, createOrder);
router.get("/orders/user", veryifyUser, allMyOrder)
router.get("/admin/order/:id", veryifyUser, roleBasedAccess("admin"), getSingleOrder);
router.put("/admin/order/:id", veryifyUser, roleBasedAccess("admin"), orderStatus);
router.get("/admin/orders", veryifyUser, roleBasedAccess("admin"), allOrders);
router.delete("/admin/order/:id", veryifyUser, roleBasedAccess("admin"), deleteOrder);

export default router;