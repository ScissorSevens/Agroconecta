import express from "express";
// import { verifyFirebaseToken } from "../middlewares/verifyFirebase";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";

const router = express.Router();

router.get("/product/getProducts", getProducts);
router.get("/product/getProductById/:id", getProductById);
router.post("/product/createProduct", createProduct);
router.put("/product/updateProduct/:id", updateProduct);
router.delete("/product/deleteProduct/:id", deleteProduct);//agregar middleware de autenticacion

export default router;
