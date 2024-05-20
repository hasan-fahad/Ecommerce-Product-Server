//create a schema for students

import { model, Schema } from 'mongoose'
import FProduct, { FInventory, FVariant, ProductModel } from './product.interface'

// Variants schema

const variantSchema = new Schema<FVariant>({
  type: {
    type: String,
    required: true,
  },
  value: {
    type: String,
    required: true,
  },
})

// Inventory schema

const inventorySchema = new Schema<FInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
})

const productSchema = new Schema<FProduct, ProductModel>({
  name: {
    type: String,
    required: true,
  },
  description: {
    type: String,
    required: true,
  },
  price: {
    type: Number,
    required: true,
  },
  category: {
    type: String,
    required: true,
  },
  tags: {
    type: [String],
    required: true,
  },
  variants: [variantSchema],
  inventory: {
    type: inventorySchema,
    required: true,
  },
})

// creating custom static method

productSchema.statics.isUserExists = async function (name: string){
    const existingProduct = await Product.findOne({name});
    return existingProduct;
}


const Product = model<FProduct, ProductModel>('Product', productSchema)

export default Product;