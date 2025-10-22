import { Request, Response } from "express";
import { ReviewModel } from "../models/review.model";

export const createReview = async (req: Request, res: Response) => {
  try {
    const review = await ReviewModel.create(req.body);
    res.status(201).json(review);
  } catch {
    res.status(500).json({ message: "Error al crear reseña" });
  }
};

export const getReviewsByProduct = async (req: Request, res: Response) => {
  try {
    const reviews = await ReviewModel.find({ producto_id: req.params.productId })
      .populate("usuario_id producto_id");
    res.json(reviews);
  } catch {
    res.status(500).json({ message: "Error al obtener reseñas" });
  }
};
