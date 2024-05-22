// Product controller

import { Request, Response } from 'express'
import { productValidationSchema } from './product.validation'
import { ProductService } from './product.service'
import { IAnyObject } from './product.interface'

// Create product

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: ProductData } = req.body
    const zodParsedData = productValidationSchema.parse(ProductData)
    const result = await ProductService.createProductIntoDB(zodParsedData)
    res.status(200).json({
      success: true,
      message: 'Product created succesfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message || 'something went wrong',
      error: error,
    })
  }
}

// Get all products from DB

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const { searchTerm } = req.query

    const find: IAnyObject = {}
    if (searchTerm) {
      find['$or'] = [
        { name: new RegExp(searchTerm as string, 'i') },
        { description: new RegExp(searchTerm as string, 'i') },
      ]
    }

    const result = await ProductService.getAllProductsFromDB(find)

    const response: IAnyObject = {
      success: result.length > 0,
      message:
        result.length > 0
          ? 'Products fetched successfully!'
          : 'Product Not found',
    }

    if (result.length > 0) {
      response.data = result
    }

    res.status(200).json(response)
  } catch (error) {
    res.status(400).json({
      success: false,
      message: 'products not found',
    })
  }
}

// Get Single products from DB

const getSingleProductFromDB = async (req: Request, res: Response) => {
  try {
    const { productId } = req.params

    const result = await ProductService.getSingleProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product fetched successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

// Update product
const updateProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const { body } = req
    if (!body) {
      return res.status(400).json({
        success: false,
        message: 'No data found',
      })
    }

    const result = await ProductService.updateProductIntoDB(productId, req.body)

    res.status(200).json({
      success: true,
      message: 'Product updated successfully!',
      data: result,
    })
  } catch (error) {
    res.status(400).json({
      success: false,
      message: "Couldn't update data",
      error,
    })
  }
}

// Delete product

const deleteProduct = async (req: Request, res: Response) => {
  try {
    const productId = req.params.productId
    const result = await ProductService.deleteProductFromDB(productId)
    res.status(200).json({
      success: true,
      message: 'Product deleted successfully!',
      data: result,
    })
  } catch (err: any) {
    res.status(500).json({
      success: false,
      message: err.message || 'something went wrong',
      error: err,
    })
  }
}

export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProductFromDB,
  updateProduct,
  deleteProduct,
}
