export const getAllProducts = (req, res)=>{
  res.status(200).json({
    message : "All products"
  })
}

export const getSingleProduct = (req, res)=>{
  res.status(200).json({
    message : "single product"
  })
}