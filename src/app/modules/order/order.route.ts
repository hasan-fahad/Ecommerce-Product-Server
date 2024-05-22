import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// create single product
router.post("/", OrderController.createOrderController );
// get all orders
router.get("/", OrderController.getAllOrderController);

export const OrderRoutes = router;