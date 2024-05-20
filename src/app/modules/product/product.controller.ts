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
};

// Get all products from DB

const getAllProducts = async (req: Request, res: Response) => {
  try {
    const result = await ProductService.getAllProductsFromDB();
    res.status(200).json({
      success: true,
      message: 'Products fetched succesfully!',
      data: result,
    })
  } catch (error: any) {
    res.status(500).json({
      success: false,
      message: error.message ||'something went wrong',
      error: error,
    })
  }
};

// Get Single products from DB

const getSingleProductFromDB =async (req: Request, res: Response) => {
    try{
        const {productId} = req.params;

        const result = await ProductService.getSingleProductFromDB(productId);
        res.status(200).json({
            success: true,
            message: 'Product fetched successfully!',
            data: result,
          });
        } catch (err: any) {
          res.status(500).json({
            success: false,
            message: err.message || 'something went wrong',
            error: err,
          });
        }
    };



export const ProductController = {
  createProduct,
  getAllProducts,
  getSingleProductFromDB
}
