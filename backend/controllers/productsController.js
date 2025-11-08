import Product from "../models/productModel.js";
import { wrapAsync } from "../middlewares/wrapAsync.js";

export const addProduct = wrapAsync(async (req, res) => {
  const { name, description, price, images, category } = req.body;

  if (!name || !description || !price || !images || !category) {
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

