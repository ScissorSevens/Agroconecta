import { Types } from "mongoose";
import { CartItem } from "./cart.interface";
import { Direccion } from "./user.interface";

export type ObjectId = Types.ObjectId | string;
export interface Order {
  _id?: ObjectId;
  comprador_uid: string;
  vendedor_uid?: string;
  items: CartItem[];
  total: number;
  metodo_pago?: string;
  direccion_envio?: Direccion;
  estado?: "pendiente" | "enviado" | "entregado" | "cancelado";
  fecha_pedido?: string;
}