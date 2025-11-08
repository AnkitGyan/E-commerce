import Product from "../models/productModel.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";

export const addProduct = wrapAsync(async (req, res) => {
  const { name, description, price, images, category, stock } = req.body;

  if (!name || !description || !price || !images || !category || !stock) {
    return res.status(400).json({
      success: false,
      message: "All fields are required",
    });
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


export const getAllProducts = wrapAsync(async (req, res) => {
  const products = await Product.find().select("-__v -updatedAt");

  if (products.length === 0) {
    return res.status(404).json({
      success: false,
      message: "No products found",
    });
  }

  res.status(200).json({
    success: true,
    message: "Products fetched successfully",
    count: products.length,
    products,
  });
});

export const getSingleProduct = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id).select("-__v -updatedAt");

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "No product found with this ID",
    });
  }

  res.status(200).json({
    success: true,
    message: "Product fetched successfully",
    product,
  });
});

export const updateProduct = wrapAsync(async (req, res) => {
  const { id } = req.params;

  let product = await Product.findById(id);
  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
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

export const deleteProduct = wrapAsync(async (req, res) => {
  const { id } = req.params;

  const product = await Product.findById(id);

  if (!product) {
    return res.status(404).json({
      success: false,
      message: "Product not found",
    });
  }

  await product.deleteOne();

  res.status(200).json({
    success: true,
    message: "Product deleted successfully",
  });
});
