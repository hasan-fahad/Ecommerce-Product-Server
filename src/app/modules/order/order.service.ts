import { Response } from "express";
import { IAnyObject } from "../product/product.interface";
import Product from "../product/product.model";
import IOrder from "./order.interface";
import Order from "./order.model";


const createOrderService = async (orderData: IOrder, res: Response) => {
  try {
    const productId = orderData.productId;

    const response = {
      success: false,
      message: "",
    };

    // return if the order quantity is 0
    if (orderData.quantity < 1) {
      response.message = "Insufficient order quantity";
      response.success = false;
      return res.status(400).send(response);
    }

    // find the product
    const product = await Product.findById(productId);
    if (!product) {
      response.message = "Invalid product id";
      response.success = false;
      return res.status(400).json(response);
    }

    //   check if the product quantity
    const productObj = product.toObject();
    const availableQntt = productObj.inventory.quantity;
    const isStock = productObj.inventory.inStock;
    if (!isStock || orderData.quantity > availableQntt) {
      response.message = "Insufficient quantity available in inventory";
      response.success = false;
      return res.status(400).json(response);
    }

    //   check if the quantity is equal to available quantity
    const isEqualQntt = productObj.inventory.quantity === orderData.quantity;

    //   update the isStock propertry
    if (isEqualQntt) {
      await Product.findByIdAndUpdate(
        productId,
        { "inventory.inStock": false, "inventory.quantity": 0 },
        { new: true, runValidators: true }
      );
    } else {
      // set new product Quantity
      await Product.findByIdAndUpdate(
        productId,
        {
          "inventory.quantity":
            productObj.inventory.quantity - orderData.quantity,
        },
        { new: true, runValidators: true }
      );
    }

    //   set the order
    const result = await Order.create(orderData);

    response.message = "Order created successfully!";
    response.success = true;
    res.json({
      ...response,
      data: result,
    });
  } catch (error) {
    res.status(400).send({
      success: false,
      message: "Cant't create order",

    });
  }
};

const getAllOrderService = async (find: IAnyObject) => {
  const result = await Order.find(find);
  return result;
};

export const orderServices = {
  createOrderService,
  getAllOrderService,
};

