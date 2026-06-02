import express from 'express';
import { veryifyUser } from '../middlewares/userAuth.js';
import { processPayment } from '../controllers/paymentController.js';
const router = express.Router();

router.post("/payment/process", veryifyUser, processPayment);

export default router;