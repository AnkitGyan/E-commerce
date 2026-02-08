import Product from "../models/productModel.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";
import HandleError from "../utils/handleError.js";
import APIFuntionality from "../utils/apiFuntionality.js";
//adding product
export const addProduct = wrapAsync(async (req, res, next) => {
  const { name, description, price, images, category, stock } = req.body;

  if (!name || !description || !price || !images || !category || !stock) {
    return next(new HandleError(404, "All field are required"));
  }

  const product = await Product.create({
    name,
    description,
    price,
    images,
    category,
    stock,
    user: req.user.id,
  });

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
});


export const getAllProducts = wrapAsync(async (req, res, next) => {
  const resultPerPage = 10;

  const apiFuntionality = new APIFuntionality(Product.find(), req.query)
    .search()
    .filter()
    .sort()
    .limitFields(); 

  const queryConditions = apiFuntionality.query.clone().getQuery();

  const totalProducts = await Product.countDocuments(queryConditions);

  const totalPage = Math.max(1, Math.ceil(totalProducts / resultPerPage));
  const currentPage = Number(req.query.page) || 1;

  // Prevent invalid page number
  if (currentPage > totalPage && totalProducts > 0) {
    return next(new HandleError(404, "This page does not exist"));
  }

  // Apply pagination now
  apiFuntionality.pagination(resultPerPage);

  const products = await apiFuntionality.query;

  // Do NOT send 404 for no products → better UX
  if (!products || products.length === 0) {
    return res.status(200).json({
      success: true,
      message: "No products found",
      count: 0,
      products: [],
      totalProducts,
      currentPage,
      totalPage,
    });
  }

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    count: products.length,
    products,
    totalProducts,
    currentPage,
    totalPage,
  });
});



export const getSingleProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).select("-__v -updatedAt");

  if (!product) {
    return next(new HandleError(404, "No product found with this Id"));
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
});

export const updateProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  let product = await Product.findById(id);
  if (!product) {
    return next(new HandleError(404, "Product not found"))
  }


  product = await Product.findByIdAndUpdate(id, req.body, {
    new: true,    
    runValidators: true,  
    useFindAndModify: false
  });

  res.status(200).json({
    success: true,
    message: "Product updated successfully",
    product
  });
});

export const deleteProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return next(new HandleError(404, "Product not found"));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});

//create and update review for product
export const createProductReview = wrapAsync(async (req, res, next) => {
  const {rating, comment, productId} = req.body;
  
  if(!rating || !comment || !productId){
    return next (new HandleError(400, "Please provide rating, comment and productId"));
  }
  const review = {
    user : req.user._id,
    name : req.user.name,
    rating : Number(rating),
    comment : commment,
  }
  const product = await Product.findById(productId);
  if(!product){
    return next(new HandleError(404, "Product not found"));
  } 
  const isReviewed = product.reviews.find(
    (rev) => rev.user.toString() === req.user._id.toString()
  );  

  if(isReviewed){
    product.reviews.forEach((rev) => {    
      if(rev.user.toString() === req.user._id.toString()){  
        rev.rating = rating;
        rev.comment = comment;
      }
    });
  } else {
    product.reviews.push(review);
    product.noOfReviews = product.reviews.length;
  }
  let avg = 0;
  product.reviews.forEach((rev) => {
    avg += rev.rating;
  });   
  product.rating = avg / product.reviews.length;

  await product.save({validateBeforeSave : false});
  res.status(200).json({
    success : true,
    message : "Review added/updated successfully"
  })
}); 


// get product reviews
export const getProductReviews = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.id);

  if (!product) {
    return next(new HandleError(404, "Product not found"));
  }   
  res.status(200).json({
    success: true,
    reviews: product.reviews,
  });
}); 

//delete own review for a product
export const deleteReview = wrapAsync(async (req, res, next) => {
  const product = await Product.findById(req.query.productId);

  if (!product) {
    return next(new HandleError(404, "Product not found"));
  }   
  const reviews = product.reviews.filter(
    (rev) => rev._id.toString() !== req.query.id.toString()
  );    
  const noOfReviews = reviews.length;
  let avg = 0;
  reviews.forEach((rev) => {
    avg += rev.rating;
  })   
  const rating = noOfReviews === 0 ? 0 : avg / noOfReviews;
  await Product.findByIdAndUpdate(
    req.query.productId,
    { 
      reviews,
      rating,
      noOfReviews
    },
    {
      new: true,
      runValidators: true,
      useFindAndModify: false
    }
  );
  res.status(200).json({
    success: true,
    message: "Review deleted successfully"
  });
});
  
//admin get all products --for manage orders
export const getAdminProducts = wrapAsync(async (req, res, next) => {
 const products = await Product.find().select("-__v -updatedAt");

 res.status(200).json({
   success: true,
   products,
 });  
});

