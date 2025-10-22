import { Types } from "mongoose";

export type ObjectId = Types.ObjectId | string;

export interface CartItem {
  producto_id: ObjectId;
  nombre: string;
  cantidad: number;
  precio_unitario: number;
}

export interface Cart {
  _id?: ObjectId;
  comprador_uid: string;
  items: CartItem[];
  total: number;
  fecha_actualizacion?: string;
}