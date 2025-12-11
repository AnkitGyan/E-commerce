import Order from '../models/orderModel.js';
import { wrapAsync } from '../middlewares/wrapAsync.js';
import HandleError from '../utils/handleError.js';  
import Product from '../models/productModel.js';
import User from '../models/user.js';

//create new order
export const createOrder = wrapAsync(async (req, res, next) => {
  const {
    orderItems, shippingInfo, itemsPrice,
    taxPrice, shippingPrice,
    totalPrice, paymentInfo
  } = req.body; 
  if (!orderItems || orderItems.length === 0) {
    return next(new HandleError(400, "No order items provided"));
  }   
  const order = await Order.create({
    orderItems,
    shippingInfo,   
    itemsPrice,
    taxPrice,
    shippingPrice,    
    totalPrice,
    paymentInfo,
    paidAt: Date.now(),
    user: req.user._id,
  }); 
  res.status(201).json({
    success: true,
    message: "Order created successfully",
    order,
  });
});

//get single order
