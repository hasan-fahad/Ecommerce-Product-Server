//create type or interface

import { Model } from "mongoose"

export type FVariant = {
  type: string
  value: string
}

export type FInventory = {
  quantity: number
  inStock: boolean
}

 type FProduct = {
  name: string
  description: string
  price: number
  category: string
  tags: string[]
  variants: FVariant[]
  inventory: FInventory
}

// for creating static
export interface ProductModel extends Model<FProduct> {
    isProductExists(id: string): Promise<FProduct>
}

export default FProduct;