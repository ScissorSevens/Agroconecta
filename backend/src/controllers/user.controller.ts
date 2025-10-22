import { Request, Response } from "express";
import { UserModel } from "../models/user.model";
import {firebaseAdmin} from "../config/firebase"; // Firebase Admin SDK

export const createUser = async (req: Request, res: Response) => {
  try {
    const { uid, nombre, correo, rol } = req.body;

    // Evitar duplicados
    const existingUser = await UserModel.findOne({ firebase_uid: uid });
    if (existingUser) return res.status(400).json({ message: "El usuario ya existe" });

    const newUser = await UserModel.create({
      firebase_uid: uid,
      nombre,
      correo,
      rol,
      estado: "pendiente", // hasta que el admin lo apruebe
      fecha_registro: new Date(),
    });

    res.status(201).json(newUser);
  } catch (error) {
    console.error("Error creando usuario:", error);
    res.status(500).json({ message: "Error al crear usuario" });
  }
};

//obtener todos los usuarios admin
export const getAllUsers = async (_req: Request, res: Response) => {
  try {
    const users = await UserModel.find();
    res.json(users);
  } catch (error) {
    console.error("Error obteniendo usuarios:", error);
    res.status(500).json({ message: "Error al obtener usuarios" });
  }
};

export const getUserByFirebaseUID = async (req: Request, res: Response) => {
  try {
    const { uid } = req.params;
    const user = await UserModel.findOne({ firebase_uid: uid });

    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json(user);
  } catch (error) {
    console.error("Error obteniendo usuario:", error);
    res.status(500).json({ message: "Error al obtener usuario" });
  }
};

export const updateUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const updated = await UserModel.findByIdAndUpdate(id, req.body, { new: true });
    if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });
    res.json(updated);
  } catch (error) {
    console.error("Error actualizando usuario:", error);
    res.status(500).json({ message: "Error al actualizar usuario" });
  }
};


export const deleteUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;

    const user = await UserModel.findByIdAndDelete(id);
    if (!user) return res.status(404).json({ message: "Usuario no encontrado" });

    // También lo eliminamos de Firebase Auth
    await firebaseAdmin.auth().deleteUser(user.uid);

    res.json({ message: "Usuario eliminado correctamente" });
  } catch (error) {
    console.error("Error eliminando usuario:", error);
    res.status(500).json({ message: "Error al eliminar usuario" });
  }
};


export const approveOrRejectUser = async (req: Request, res: Response) => {
  try {
    const { id } = req.params;
    const { estado } = req.body; // "aprobado" o "rechazado"

    if (!["aprobado", "rechazado"].includes(estado)) {
      return res.status(400).json({ message: "Estado inválido" });
    }

    const updated = await UserModel.findByIdAndUpdate(
      id,
      { estado },
      { new: true }
    );

    if (!updated) return res.status(404).json({ message: "Usuario no encontrado" });

    res.json({ message: `Usuario ${estado} correctamente`, user: updated });
  } catch (error) {
    console.error("Error aprobando usuario:", error);
    res.status(500).json({ message: "Error al actualizar estado del usuario" });
  }
};



