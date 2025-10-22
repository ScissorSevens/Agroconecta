import { Types } from "mongoose";

export type ObjectId = Types.ObjectId | string;
export interface Notification {
  _id?: ObjectId;
  usuario_uid: string;
  mensaje: string;
  tipo?: string;
  leido?: boolean;
  fecha?: string;
}
