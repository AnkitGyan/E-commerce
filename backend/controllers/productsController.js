import Product from "../models/productModel.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";
import HandleError from "../utils/handleError.js";

//adding product
export const addProduct = wrapAsync(async (req, res, next) => {
  const { name, description, price, images, category, stock } = req.body;

  if (!name || !description || !price || !images || !category || !stock) {
    return next(HandleError(404, "All field are required"));
  }

  const product = await Product.create({
    name,
    description,
    price,
    images,
    category,
    stock,
  });

  res.status(201).json({
    success: true,
    message: "Product added successfully",
    product,
  });
});


export const getAllProducts = wrapAsync(async (req, res, next) => {
  const products = await Product.find().select("-__v -updatedAt");

  if (products.length === 0) {
   return next(HandleError(404, "No product found"))
  }

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    count: products.length,
    products,
  });
});

export const getSingleProduct = wrapAsync(async (req, res, next) => {
  const { id } = req.params;

  const product = await Product.findById(id).select("-__v -updatedAt");

  if (!product) {
    return next(HandleError(404, "No product found with this Id"));
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
    return next(HandleError(404, "Product not found"))
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
    return next(HandleError(404, "Product not found"));
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
