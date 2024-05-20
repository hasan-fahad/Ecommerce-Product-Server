// Product service

import Product from './product.model'
import FProduct from './product.interface'

// creating into DB

const createProductIntoDB = async (productData: FProduct) => {
  const existingProduct = await Product.findOne({ name: productData.name })
  if (existingProduct) {
    throw new Error(`Product already exists`)
  }
  const Result = await Product.create(productData)
  return Result
}

// get all products DB
const getAllProductsFromDB = async () => {
  const Result = await Product.find()
  return Result
}

//get single product from DB

const getSingleProductFromDB = async (id: string) => {
  const Result = await Product.find({ _id: id })
  return Result;
}

export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB
}
