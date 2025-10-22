import { Schema, model, Model } from "mongoose";
import { User } from "../interfaces/user.interface";

const UserSchema = new Schema<User>({
  uid: { type: String, required: true, unique: true },
  nombre: { type: String, required: true },
  email: { type: String, required: true, unique: true },
  telefono: { type: String },
  rol: { type: String, enum: ["admin", "vendedor", "comprador"], default: "comprador" },
  direccion: {
    departamento: String,
    ciudad: String,
    detalle: String
  },
  foto_perfil: String,
  fecha_registro: { type: Date, default: Date.now },
  estado: { type: String, enum: ["activo", "pendiente", "bloqueado"], default: "activo" }
}, { timestamps: true });

export const UserModel = model<User>("User", UserSchema) as Model<User>;
