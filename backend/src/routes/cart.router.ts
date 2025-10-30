import express from "express";
import { addToCart,getCart,clearCart } from "../controllers/cart.controller.js";
const router = express.Router();    
router.get("/:uid", getCart);
router.post("/", addToCart);
router.delete("/:uid", clearCart);
export default router;