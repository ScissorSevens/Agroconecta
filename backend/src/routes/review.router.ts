import express from "express";

import { getReviewsByProduct,createReview } from "../controllers/review.controller.js";

const router = express.Router();

router.get("/review/getReviewsByProduct/:productId", getReviewsByProduct);
router.post("/review/createReview", createReview);

export default router;
