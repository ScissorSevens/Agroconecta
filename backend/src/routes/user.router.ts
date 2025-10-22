import express from "express";
import {
  createUser,
  getAllUsers,
  getUserByFirebaseUID,
  updateUser,
  deleteUser,
  approveOrRejectUser,
} from "../controllers/user.controller";

import { verifyFirebaseToken } from "../middlewares/verifyFirebase";
import { checkRole } from "../middlewares/checkRole"; // middleware opcional

const router = express.Router();

router.post("/user/createUser", verifyFirebaseToken, createUser);
router.get("/user/getAllUsers", verifyFirebaseToken, checkRole(["admin"]), getAllUsers);
router.get("/user/getUserByFirebaseUID/:uid", verifyFirebaseToken, getUserByFirebaseUID);
router.put("/user/updateUser/:id", verifyFirebaseToken, updateUser);
router.delete("/user/deleteUser/:id", verifyFirebaseToken, checkRole(["admin"]), deleteUser);
router.patch("/user/approveOrRejectUser/:id/estado", verifyFirebaseToken, checkRole(["admin"]), approveOrRejectUser);

export default router;
