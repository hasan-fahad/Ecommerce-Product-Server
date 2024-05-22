//create a schema for students

import { model, Schema } from 'mongoose'
import IProduct, {
  IInventory,
  IVariant,
  ProductModel,
} from './product.interface'

// Variants schema

const variantSchema = new Schema<IVariant>({
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

const inventorySchema = new Schema<IInventory>({
  quantity: {
    type: Number,
    required: true,
  },
  inStock: {
    type: Boolean,
    required: true,
  },
})

const productSchema = new Schema<IProduct, ProductModel>({
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
  isDeleted: {
    type: Boolean,
    default: false,
  },
})
// Query Middleware
productSchema.pre('find', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

productSchema.pre('findOne', function (next) {
  this.find({ isDeleted: { $ne: true } })
  next()
})

// [ {$match: { isDeleted : {  $ne: : true}}}   ,{ '$match': { id: '123456' } } ]

productSchema.pre('aggregate', function (next) {
  this.pipeline().unshift({ $match: { isDeleted: { $ne: true } } })
  next()
})
// creating custom static method

productSchema.statics.isUserExists = async function (name: string) {
  const existingProduct = await Product.findOne({ name })
  return existingProduct
}

const Product = model<IProduct, ProductModel>('Product', productSchema)

export default Product
