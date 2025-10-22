import { Request, Response, NextFunction } from "express";
import { firebaseAdmin } from "../config/firebase";

export const verifyFirebaseToken = async (
  req: Request,
  res: Response,
  next: NextFunction
) => {
  try {
    const authHeader = req.headers.authorization;

    if (!authHeader || !authHeader.startsWith("Bearer ")) {
      return res.status(401).json({ message: "Token no proporcionado" });
    }

    const token = authHeader.split(" ")[1];
    const decodedToken = await firebaseAdmin.auth().verifyIdToken(token);

    // Agregamos el UID del usuario al request
    (req as any).uid = decodedToken.uid;

    next();
  } catch (error) {
    console.error("Error verificando token Firebase:", error);
    res.status(401).json({ message: "Token inválido o expirado" });
  }
};
