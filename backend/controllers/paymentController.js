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

//Payment Verification

export const paymentVerification = wrapAsync(async (req, res)=>{
  const {razorpay_payment_id, razorpay_order_id, razorpay_signature} = req.body;
  const sign = razorpay_order_id + "|" + razorpay_payment_id;
  const expectedSign = crypto.createHmac('sha256', process.env.RAZORPAY_API_SECRET).update(sign.toString()).digest('hex');

  if(expectedSign === razorpay_signature){
    res.status(200).json({
      success : true,
      message : 'Payment Verified Successfully',
      reference : razorpay_payment_id
    })
  }else{  
    return res.status(200).json({
      success: false,
      message: "Payment verification failed",
    });
  }
})