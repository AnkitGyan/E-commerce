import Order from '../models/orderModel.js';
import { wrapAsync } from '../middlewares/wrapAsync.js';
import HandleError from '../utils/handleError.js';  
import Product from '../models/productModel.js';

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
    const order = await Order.findById({_id : id}).populate("user", "name email");

    if(!order){
      return next(new HandleError("Order not found", 404));
    }
  res.jsom(201).json({
    success : true,
    order
  })
});

// get all my order

export const allMyOrder = wrapAsync(async (req, res, next)=>{
  const order = await Order.find({user : req.user._id });

  if(!order){
    return next(new HandleError("No order found", 404));
  }

  return res.status(200).json({
    success: true,
    order
  })
})

// admin get all user's order
export const allOrders = wrapAsync(async (req, res, next)=>{
  const orders = await Order.find();
  
  if(!orders){
    return next(new HandleError("NO order found", 404));
  }
  let totalAmount = 0;
  orders.forEach(order =>{
    totalAmount += order.totalPrice;
  })

  return res.status(200).json({
    success : true,
    orders,
    totalAmount
  })
})

//update order status

export const orderStatus = wrapAsync(async (req, res, next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new HandleError("no order found", 404))
  }
  if(order.orderStatus === "delivered"){
    return next(new HandleError("This order is already been delivered", 404));
  }
 
 await Promise.all(order.orderItems.map(items => updateQuantity(items.product, items.quantity)));
 
 order.orderStatus = req.body.status;
 if(order.orderStatus === "delivered"){
  order.deliveredAt = Date.now();
 }
await order.save({validateBeforeSave : false});
 res.json({
  success : true,
  order
 })
})


// updatequanity function

async function updateQuantity(id, quantity){  
  const product = await Product.findById(id);
  if(!product){
    return next (new HandleError("Product not found", 404));
  }
  product.stock -= quantity;  
  await product.save({validateBeforeSave : false});
}

//delete order 
export const deleteOrder = wrapAsync(async (req, res, next)=>{
  const order = await Order.findById(req.params.id);

  if(!order){
    return next(new HandleError("Order not found", 404));
  }
  
  if(order.orderStatus === "delivered"){
    return next(new HandleError("Delivered order cannot be deleted", 400));
  } 
  
  if(order.orderStatus === "shipped"){
    return next(new HandleError("Shipped order cannot be deleted", 400));
  } 
  if(order.orderStatus === "processing"){
    return next(new HandleError("Processing order cannot be deleted", 400));
  }   

  await order.deleteOne({_id:req.params.id}); 

  return res.status(2000).json({
    success: true,
    message: "Order deleted successfully",
  })
})