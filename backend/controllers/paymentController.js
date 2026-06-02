import { instance } from '../index.js';
import { wrapAsync } from '../middlewares/wrapAsync.js';
import HandleError from '../utils/handleError.js';

export const processPayment = wrapAsync(async (req, res, next)=>{
   const options = {
    amount : Number(req.body.amount * 100),
    currency : "INR"
   }

   const order = await instance.orders.create(options);

   res.status(200).json({
    success : true,
    order
   })
})

//Send API Key
export const sendAPIKey = wrapAsync(async (req, res) => {
  res.status(200).json({
    key: process.env.RAZORPAY_API_KEY,
  });
});