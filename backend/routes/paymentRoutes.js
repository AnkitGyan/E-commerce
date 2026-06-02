import express from 'express';
import { veryifyUser } from '../middlewares/userAuth.js';
import { processPayment, sendAPIKey } from '../controllers/paymentController.js';
const router = express.Router();

router.post("/payment/process", veryifyUser, processPayment);
router.route('/getKey').get(veryifyUser,sendAPIKey);

export default router;