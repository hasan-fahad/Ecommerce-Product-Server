//create type or interface

import { Model } from 'mongoose'

export type IVariant = {
  type: string
  value: string
}

export type IInventory = {
  quantity: number
  inStock: boolean
}

type IProduct = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: IVariant[]
  inventory: IInventory
  isDeleted: boolean
}
// querry
export interface IAnyObject {
  [key: string]: any;
}
// for creating static
export interface ProductModel extends Model<IProduct> {
  isProductExists(id: string): Promise<IProduct>
}

export default IProduct
