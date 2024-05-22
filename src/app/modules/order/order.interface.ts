import { ProductService } from './../product/product.service';
// Order Interface

import { Schema } from "mongoose";

interface IOrder {
            email: string,
            productId: string | Schema.Types.ObjectId,
            Price: number,
            quantity: number
}

export default IOrder;