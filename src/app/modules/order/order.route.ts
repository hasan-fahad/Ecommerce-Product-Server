import express from "express";
import { OrderController } from "./order.controller";

const router = express.Router();

// create single product
router.post("/orders", OrderController.createOrderController );
// get all orders
router.get("/orders", OrderController.getAllOrderController);

export const OrderRoutes = router;