import { Types } from "mongoose";

export type ObjectId = Types.ObjectId | string;

export interface Direccion {
  departamento: string;
  ciudad: string;
  detalle: string;
}

export interface User {
  _id?: ObjectId;
  uid: string; // uid de Firebase
  nombre: string;
  email: string;
  telefono?: string;
  rol: "admin" | "vendedor" | "comprador";
  direccion?: Direccion;
  foto_perfil?: string;
  fecha_registro?: string;
  estado?: "activo" | "pendiente" | "bloqueado";
}