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

// Product update

const updateProductIntoDB = async (id: string, updateData: FProduct) => {
    const result = Product.findByIdAndUpdate(id, updateData, {
        new: true,
        runValidators: true,
      });
      return result;
}

// delete data
const deleteProductFromDB = async (id: string) => {
    const result = await Product.findByIdAndDelete(id);
    return result;
  };
export const ProductService = {
  createProductIntoDB,
  getAllProductsFromDB,
  getSingleProductFromDB,
  updateProductIntoDB,
  deleteProductFromDB
}
