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
    shippingInfo,
    orderItems,
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
export const getSingleOrder = wrapAsync(async (req, res, next) => {
    const { id } = req.params;
    const order = await Order.findById(id).populate("user", "name email");

    if(!order){
      return (new HandleError("Order not found", 404));
    }
  res.jsom(201).json({
    success : true,
    order
  })
});

// get all my order

export const allMyOrder = wrapAsync(async (req, res, next)=>{
  const order = Order.find({user : req.user._id });

  if(!order){
    return (new HandleError("No order found", 404));
  }

  return res.status(200).json({
    success: true,
    order
  })
})

// admin get all user's order
