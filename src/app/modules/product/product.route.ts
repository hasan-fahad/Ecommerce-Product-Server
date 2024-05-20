import express from 'express'
import { ProductController } from './product.controller'
// Product Route

const router = express.Router();

// create single product route

router.post('/create-product', ProductController.createProduct);

// get all products route

router.get('/', ProductController.getAllProducts);

// get single product route
router.get('/:productId', ProductController.getSingleProductFromDB);

export const ProductRoutes = router;
