

// order controller

import { Request, Response } from "express";
import { orderServices } from "./order.service";
import zodOrderValidation from "./order.validation";
import { IAnyObject } from "../product/product.interface";


 const createOrderController = async (req: Request, res: Response) => {
  const { body } = req;
  if (!body) {
    return res.send({
      success: false,
      messaeg: "No content found",
    });
  }
  const { data, error } = zodOrderValidation.safeParse(body);
  if (error) {
    return res.send({
      success: false,
      message: "Invalid order data format",
      error,
    });
  }

  const result = await orderServices.createOrderIntoDB(data, res);
  return result
};

// get all order
const getAllOrderController = async (req: Request, res: Response) => {
  try {
    const { email } = req.query;

    // response data

    const find: IAnyObject = {};
    if (email) {
      find.email = email;
    }

    const result = await orderServices.getAllOrderIntoDB(find);

    const response: IAnyObject = {
      success: result.length > 0,
      message:
        result.length > 0 ? "Orders fetched successfully!" : "Order Not found",
    };

    if (result.length > 0) {
      response.data = result;
    }
    res.status(200).json(response);
  } catch {
    res.status(500).json({
      success: false,
      message: "Orders not found",
    });
  }
};

export const OrderController = {
    createOrderController,
    getAllOrderController
}