import { Schema, model, Model, Types } from "mongoose";
import { Order } from "../interfaces/order.interface";

const OrderItemSchema = new Schema({
  producto_id: { type: Types.ObjectId, ref: "Product", required: true },
  nombre: { type: String, required: true },
  cantidad: { type: Number, required: true },
  precio_unitario: { type: Number, required: true }
}, { _id: false });

const DireccionSchema = new Schema({
  departamento: { type: String, required: true },
  ciudad: { type: String, required: true },
  detalle: { type: String, required: true }
}, { _id: false });

const OrderSchema = new Schema<Order>({
  comprador_uid: { type: String, required: true },
  vendedor_uid: { type: String },
  items: { type: [OrderItemSchema], required: true },
  total: { type: Number, required: true, min: 0 },
  metodo_pago: { type: String, default: "transferencia" },
  direccion_envio: { type: DireccionSchema },
  estado: {
    type: String,
    enum: ["pendiente", "enviado", "entregado", "cancelado"],
    default: "pendiente"
  },
  fecha_pedido: { type: Date, default: Date.now }
}, { timestamps: true });

export const OrderModel = model<Order>("Order", OrderSchema) as Model<Order>;
