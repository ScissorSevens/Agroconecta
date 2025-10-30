import express from "express";
// import { verifyFirebaseToken } from "../middlewares/verifyFirebase";
import {
  createProduct,
  getProducts,
  getProductById,
  updateProduct,
  deleteProduct,
} from "../controllers/product.controller";
// import { verifyFirebaseToken } from "../middlewares/verifyFirebase";
const router = express.Router();

router.get("/", getProducts);

// // 🟢 Obtener un producto por ID
// router.get("/:id", getProductById);

// // 🟠 Crear un producto (solo admin o vendedor)
// router.post("/", verifyFirebaseToken, checkRole(["admin", "vendedor"]), createProduct);

// // 🟡 Actualizar un producto (solo admin o vendedor)
// router.put("/:id", verifyFirebaseToken, checkRole(["admin", "vendedor"]), updateProduct);

// // 🔴 Eliminar un producto (solo admin)
// router.delete("/:id", verifyFirebaseToken, checkRole(["admin"]), deleteProduct);

// export default router;

router.get("/", getProducts);

// 🟢 Obtener un producto por ID
router.get("/:id", getProductById);

// 🟠 Crear un producto (solo admin o vendedor)
router.post("/", createProduct);

// 🟡 Actualizar un producto (solo admin o vendedor)
router.put("/:id", updateProduct);

// 🔴 Eliminar un producto (solo admin)
router.delete("/:id", deleteProduct);

export default router;