import { Schema, model, Model, Types } from "mongoose";
import { Cart } from "../interfaces/cart.interface";

const CartItemSchema = new Schema({
  producto_id: { type: Types.ObjectId, ref: "Product", required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true, min: 1 },
  precio_unitario: { type: Number, required: true, min: 0 },
}, { _id: false });

const CartSchema = new Schema<Cart>({
  comprador_uid: { type: String, required: true }, // UID de Firebase
  items: { type: [CartItemSchema], default: [] },
  total: { type: Number, required: true, min: 0 },
  fecha_actualizacion: { type: Date, default: Date.now }
}, { timestamps: true });

export const CartModel = model<Cart>("Cart", CartSchema) as Model<Cart>;
