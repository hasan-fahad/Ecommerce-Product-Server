// Product controller

import { Request, Response } from 'express'
import { productValidationSchema } from './product.validation'
import { ProductService } from './product.service'

// Create product

const createProduct = async (req: Request, res: Response) => {
  try {
    const { product: ProductData } = req.body;
    const zodParsedData = productValidationSchema.parse(ProductData);
    const result = await ProductService.createProductIntoDB(zodParsedData);
    res.status(200).json({
      success: true,
      message: 'Product created succesfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ||'something went wrong',
      error: error,
    })
  }
}

export const ProductController = {
  createProduct,
}
