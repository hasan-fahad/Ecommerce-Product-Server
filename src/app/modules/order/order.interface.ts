
// Order Interface

import { Schema } from "mongoose";

interface IOrder {
            email: string,
            productId: string | Schema.Types.ObjectId,
            price: number,
            quantity: number
}

export default IOrder;