import { Schema, model, Model } from "mongoose";
import { Review } from "../interfaces/review.interface";

const ReviewSchema = new Schema<Review>({
  producto_id: { type: Schema.Types.ObjectId, ref: "Product", required: true },
  usuario_uid: { type: String, required: true },
  comentario: { type: String, maxlength: 500 },
  puntuacion: { type: Number, required: true, min: 1, max: 5 },
  fecha: { type: Date, default: Date.now }
}, { timestamps: true });

export const ReviewModel = model<Review>("Review", ReviewSchema) as Model<Review>;
