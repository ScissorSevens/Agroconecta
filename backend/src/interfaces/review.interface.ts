import { Types } from "mongoose";

export type ObjectId = Types.ObjectId | string;
export interface Review {
  _id?: ObjectId;
  producto_id: ObjectId;
  usuario_uid: string;
  comentario?: string;
  puntuacion: number;
  fecha?: string;
}