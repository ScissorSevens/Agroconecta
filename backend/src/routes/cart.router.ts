import express from "express";
import { addToCart,getCart,clearCart } from "../controllers/cart.controller.js";
const router = express.Router();    
router.get("/cart/getcart/:uid", getCart);
router.post("/cart/addTocart", addToCart);
router.delete("/cart/clearCart/:uid", clearCart);
export default router;