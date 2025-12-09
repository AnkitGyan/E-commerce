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

  const products = await apiFuntionality.query.select("-__v -updatedAt");

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
