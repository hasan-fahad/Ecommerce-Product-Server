// Order Model

import { model, Schema } from "mongoose";
import IOrder from "./order.interface";

const orderSchema = new Schema<IOrder>({
    email: { 
        type: String,
        required: true,
    },
    productId:  {
        type: Schema.Types.ObjectId,
        ref: "product",
        required: true,
    },
    price: {
        type: Number,
        required: true,
    },
    quantity: {
        type: Number,
        required: true,
    }
});


const Order = model("Order", orderSchema);

export default Order;