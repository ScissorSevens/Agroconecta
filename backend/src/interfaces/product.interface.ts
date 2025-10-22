import { Types } from "mongoose";

export type ObjectId = Types.ObjectId | string;

export interface Category {
  _id?: ObjectId;
  nombre: string;
  descripcion?: string;
  slug?: string;
}

export interface Product {
  _id?: ObjectId;
  nombre: string;
  descripcion?: string;
  precio: number;
  stock: number;
  categoria_id: ObjectId;
  vendedor_uid: string;
  imagenes?: string[];
  etiquetas?: string[];
  activo?: boolean;
  fecha_publicacion?: string;
}