import  express  from "express";

import { createOrder, getOrders, getOrderById, updateOrderStatus } from "../controllers/order.controller.js";

const router=express.Router();

router.post("/order/createOrder", createOrder);
router.get("/order/getOrders", getOrders);
router.get("/order/getOrderById/:id", getOrderById);
router.put("/order/updateOrderStatus/:id/status", updateOrderStatus);

export default router;